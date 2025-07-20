import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { BrowserProvider, Contract } from 'ethers';
import addresses from '../contracts/addresses.json';

// CryptoKitties ABI - matching the actual deployed contract
const CRYPTO_KITTIES_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function ownerOf(uint256 tokenId) view returns (address)",
  "function getKitty(uint256 tokenId) external view returns (tuple(uint256 tokenId, uint8 generation, uint256 birthTime, uint256 lastBreedTime, uint256 matronId, uint256 sireId, uint8 bodyColor, uint8 eyeColor, uint8 pattern, uint8 accessory, uint8 background, bool hasSpecialTrait, uint16 strength, uint16 agility, uint16 intelligence))",
  "function getKittiesByOwner(address owner) external view returns (uint256[] memory)",
  "function mintGen0Kitty(address to) external",
  "function owner() view returns (address)",
  "function gen0Minted() view returns (uint256)",
  "function calculateRarity(uint256 tokenId) public view returns (uint8)",
  "function canBreed(uint256 tokenId) external view returns (bool)",
  "function breedKitties(uint256 matronId, uint256 sireId) external",
  "event Birth(address owner, uint256 kittyId, uint256 matronId, uint256 sireId)",
  "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)"
];

interface Kitty {
  tokenId: string;
  generation: number;
  birthTime: number;
  lastBreedTime: number;
  matronId: string;
  sireId: string;
  bodyColor: string;
  eyeColor: string;
  pattern: string;
  accessory: number;
  background: number;
  hasSpecialTrait: boolean;
  strength: number;
  agility: number;
  intelligence: number;
  rarity?: string;
}

interface Web3ContextType {
  account: string | null;
  provider: BrowserProvider | null;
  contract: Contract | null;
  userKitties: Kitty[];
  allKitties: Kitty[];
  loading: boolean;
  connectWallet: () => Promise<void>;
  mintKitty: () => Promise<void>;
  refreshKitties: () => Promise<void>;
  testContract: () => Promise<any>;
  isConnecting: boolean;
  isMinting: boolean;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export const Web3Provider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [contract, setContract] = useState<Contract | null>(null);
  const [userKitties, setUserKitties] = useState<Kitty[]>([]);
  const [allKitties, setAllKitties] = useState<Kitty[]>([]);
  const [loading, setLoading] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isMinting, setIsMinting] = useState(false);

  const connectWallet = async () => {
    setIsConnecting(true);
    try {
      if (!window.ethereum) {
        alert('Please install MetaMask!');
        return;
      }

      const web3Provider = new BrowserProvider(window.ethereum);
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      if (accounts.length === 0) {
        throw new Error('No accounts found');
      }

      // Check if we're on Sepolia network
      const network = await web3Provider.getNetwork();
      if (Number(network.chainId) !== 11155111) {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0xAA36A7' }], // Sepolia chainId in hex
          });
        } catch (switchError: any) {
          // If the chain hasn't been added to MetaMask
          if (switchError.code === 4902) {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [{
                chainId: '0xAA36A7',
                chainName: 'Sepolia Test Network',
                nativeCurrency: {
                  name: 'Sepolia ETH',
                  symbol: 'SEP',
                  decimals: 18
                },
                rpcUrls: ['https://sepolia.infura.io/v3/'],
                blockExplorerUrls: ['https://sepolia.etherscan.io/']
              }]
            });
          }
        }
      }

      const signer = await web3Provider.getSigner();
      const cryptoKittiesContract = new Contract(
        addresses.CryptoKitties,
        CRYPTO_KITTIES_ABI,
        signer
      );

      setAccount(accounts[0]);
      setProvider(web3Provider);
      setContract(cryptoKittiesContract);

      console.log('✅ Wallet connected:', accounts[0]);
      console.log('✅ Contract address:', addresses.CryptoKitties);
      
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      alert('Failed to connect wallet. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  };

  const parseKittyData = (tokenId: string, kittyData: any): Kitty => {
    console.log(`🔍 Parsing kitty #${tokenId}:`, kittyData);
    
    // The kittyData is a tuple from our contract:
    // (tokenId, generation, birthTime, lastBreedTime, matronId, sireId, bodyColor, eyeColor, pattern, accessory, background, hasSpecialTrait, strength, agility, intelligence)
    
    const generation = Number(kittyData[1]) || 0;
    const birthTime = Number(kittyData[2]) || 0;
    const lastBreedTime = Number(kittyData[3]) || 0;
    const matronId = kittyData[4] ? kittyData[4].toString() : '0';
    const sireId = kittyData[5] ? kittyData[5].toString() : '0';
    const bodyColor = Number(kittyData[6]) || 0;
    const eyeColor = Number(kittyData[7]) || 0;
    const pattern = Number(kittyData[8]) || 0;
    const accessory = Number(kittyData[9]) || 0;
    const background = Number(kittyData[10]) || 0;
    const hasSpecialTrait = Boolean(kittyData[11]);
    const strength = Number(kittyData[12]) || 0;
    const agility = Number(kittyData[13]) || 0;
    const intelligence = Number(kittyData[14]) || 0;
    
    console.log(`📊 Kitty #${tokenId} - Gen: ${generation}, Strength: ${strength}, Agility: ${agility}, Intelligence: ${intelligence}`);
    
    // Calculate rarity based on battle stats
    const totalStats = strength + agility + intelligence;
    let rarity = 'Common';
    if (totalStats > 240) rarity = 'Legendary';
    else if (totalStats > 200) rarity = 'Epic';
    else if (totalStats > 160) rarity = 'Rare';
    else if (totalStats > 120) rarity = 'Uncommon';

    // Map colors to string names for display
    const colorNames = ['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange', 'Pink', 'White'];
    const patternNames = ['Solid', 'Stripes', 'Spots', 'Gradient', 'Mixed'];

    return {
      tokenId,
      generation,
      birthTime,
      lastBreedTime,
      matronId,
      sireId,
      bodyColor: colorNames[bodyColor] || 'Unknown',
      eyeColor: colorNames[eyeColor] || 'Unknown',
      pattern: patternNames[pattern] || 'Unknown',
      accessory,
      background,
      hasSpecialTrait,
      strength,
      agility,
      intelligence,
      rarity
    };
  };

  const testContract = async () => {
    if (!contract || !account) {
      console.log('❌ Cannot test contract: missing contract or account');
      alert('❌ Please connect your wallet first!');
      return;
    }

    try {
      console.log('🧪 Testing contract connection...');
      console.log('📍 Contract address:', addresses.CryptoKitties);
      console.log('👤 Account:', account);
      
      // Test basic contract calls
      const balance = await contract.balanceOf(account);
      console.log('✅ User balance:', Number(balance));
      
      const gen0Minted = await contract.gen0Minted();
      console.log('✅ Gen0 minted:', Number(gen0Minted));
      
      const contractOwner = await contract.owner();
      console.log('👑 Contract owner:', contractOwner);
      console.log('🔍 Is user owner?', account.toLowerCase() === contractOwner.toLowerCase());
      
      // If user has kitties, try to get them
      if (Number(balance) > 0) {
        console.log('🐱 User has kitties! Fetching them...');
        const kittyIds = await contract.getKittiesByOwner(account);
        console.log('🏷️ Kitty IDs:', kittyIds.map((id: any) => id.toString()));
        
        if (kittyIds.length > 0) {
          const firstKitty = await contract.getKitty(Number(kittyIds[0]));
          console.log('📊 First kitty data:', firstKitty);
        }
      }
      
      const result = {
        balance: Number(balance).toString(),
        totalSupply: Number(gen0Minted).toString(),
        owner: contractOwner,
        userAddress: account,
        isOwner: account.toLowerCase() === contractOwner.toLowerCase(),
        contractAddress: addresses.CryptoKitties
      };
      
      alert(`✅ Contract Test Results:
🐱 Your Kitties: ${result.balance}
📊 Total Supply: ${result.totalSupply}
👑 You are Owner: ${result.isOwner ? 'YES' : 'NO'}
📍 Contract: ${result.contractAddress}`);
      
      return result;
    } catch (error: any) {
      console.error('❌ Contract test failed:', error);
      alert(`❌ Contract test failed: ${error.message || error}`);
      return null;
    }
  };

  const refreshKitties = useCallback(async () => {
    if (!contract || !account) {
      console.log('❌ Cannot refresh kitties: missing contract or account');
      return;
    }

    setLoading(true);
    try {
      console.log('🔄 Fetching kitties for account:', account);
      
      // Get user's kitties
      const balance = await contract.balanceOf(account);
      const userKittiesData: Kitty[] = [];
      
      console.log(`📊 User has ${Number(balance)} kitties`);
      
      if (Number(balance) === 0) {
        console.log('📝 No kitties found for this account');
        setUserKitties([]);
        setAllKitties([]);
        setLoading(false);
        return;
      }
      
      // Get all kitty IDs owned by user
      const kittyIds = await contract.getKittiesByOwner(account);
      console.log('🏷️ User kitty IDs:', kittyIds.map((id: any) => id.toString()));
      
      for (const tokenId of kittyIds) {
        try {
          const kittyData = await contract.getKitty(Number(tokenId));
          const kitty = parseKittyData(tokenId.toString(), kittyData);
          userKittiesData.push(kitty);
          console.log(`✅ Fetched kitty #${tokenId.toString()}`);
        } catch (error) {
          console.error(`❌ Error fetching kitty #${tokenId.toString()}:`, error);
        }
      }

      // For now, we'll just set allKitties to userKitties since we don't have totalSupply enumeration
      
      console.log(`📊 User kitties found: ${userKittiesData.length}`);
      
      // Since our contract doesn't have enumeration, we'll just use user kitties for both
      setUserKitties(userKittiesData);
      setAllKitties(userKittiesData); // For now, show only user's kitties
      
      console.log(`✅ Loaded ${userKittiesData.length} user kitties`);
      
    } catch (error) {
      console.error('Error fetching kitties:', error);
    } finally {
      setLoading(false);
    }
  }, [contract, account]);

  const mintKitty = async () => {
    if (!contract || !account) {
      alert('Please connect your wallet first!');
      return;
    }

    setIsMinting(true);
    try {
      console.log('🎭 Minting new Genesis Kitty...');
      
      // Check if user is the contract owner
      const contractOwner = await contract.owner();
      if (account.toLowerCase() !== contractOwner.toLowerCase()) {
        alert('❌ Only the contract owner can mint Genesis Kitties. You can breed existing kitties instead!');
        return;
      }

      // Check how many Gen 0 kitties have been minted
      const gen0Minted = await contract.gen0Minted();
      console.log(`📊 Gen 0 minted so far: ${Number(gen0Minted)}`);
      
      // Call mintGen0Kitty with the user's address
      const tx = await contract.mintGen0Kitty(account);
      
      console.log('📝 Transaction sent:', tx.hash);
      alert(`🎭 Minting in progress!\nTransaction: ${tx.hash.slice(0, 10)}...`);
      
      await tx.wait();
      console.log('✅ Kitty minted successfully!');
      alert('🎉 Genesis Kitty minted successfully!');
      
      // Add a small delay to ensure blockchain state is updated
      setTimeout(async () => {
        console.log('🔄 Refreshing kitties after mint...');
        await refreshKitties();
      }, 2000);
      
    } catch (error: any) {
      console.error('Error minting kitty:', error);
      
      if (error.code === 'INSUFFICIENT_FUNDS') {
        alert('❌ Insufficient ETH for gas fees. Please add more Sepolia ETH to your wallet.');
      } else if (error.message.includes('user rejected')) {
        alert('❌ Transaction was rejected by user.');
      } else if (error.message.includes('Gen 0 supply exhausted')) {
        alert('❌ All Generation 0 kitties have been minted! You can breed existing kitties instead.');
      } else if (error.message.includes('Ownable: caller is not the owner')) {
        alert('❌ Only the contract owner can mint Genesis Kitties. You can breed existing kitties instead!');
      } else {
        alert(`❌ Failed to mint kitty: ${error.message || error.reason || 'Unknown error'}`);
      }
    } finally {
      setIsMinting(false);
    }
  };

  // Load kitties when account/contract changes
  useEffect(() => {
    console.log('🔄 useEffect triggered - account:', account, 'contract:', !!contract);
    if (account && contract) {
      console.log('✅ Both account and contract available, calling refreshKitties');
      refreshKitties();
    } else {
      console.log('❌ Missing account or contract:', { account: !!account, contract: !!contract });
    }
  }, [account, contract, refreshKitties]);

  // Check for existing connection on load
  useEffect(() => {
    console.log('🔄 Checking for existing wallet connection...');
    const checkConnection = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        console.log('🔍 Found existing accounts:', accounts);
        if (accounts.length > 0) {
          console.log('🔗 Reconnecting to existing wallet...');
          await connectWallet();
        } else {
          console.log('📝 No existing wallet connection found');
        }
      } else {
        console.log('❌ No ethereum provider found');
      }
    };
    checkConnection();
  }, []);

  const value: Web3ContextType = {
    account,
    provider,
    contract,
    userKitties,
    allKitties,
    loading,
    connectWallet,
    mintKitty,
    refreshKitties,
    testContract,
    isConnecting,
    isMinting
  };

  return (
    <Web3Context.Provider value={value}>
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = (): Web3ContextType => {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};
