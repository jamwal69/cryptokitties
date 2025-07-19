// Quick contract debug script
const { ethers } = require('ethers');

const SEPOLIA_RPC = 'https://sepolia.infura.io/v3/your-key-here'; // You'll need your own RPC
const CONTRACT_ADDRESS = '0xba9847de247D2930bc8CFD9CfB26fa4e3b93cF59';
const YOUR_ADDRESS = '0xE02e75c29816858C9AB36623410132Feb9aEA689'; // Change this to your wallet

const ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function totalSupply() view returns (uint256)",
  "function owner() view returns (address)",
  "function getKitty(uint256 _id) view returns (bool isGestating, bool isReady, uint256 cooldownIndex, uint256 nextActionAt, uint256 siringWithId, uint256 birthTime, uint256 matronId, uint256 sireId, uint256 generation, uint256[] memory traits)"
];

async function checkContract() {
  try {
    console.log('🔍 Checking contract state...');
    
    // Using public RPC - change this to your provider
    const provider = new ethers.JsonRpcProvider('https://sepolia.drpc.org');
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
    
    console.log('📍 Contract:', CONTRACT_ADDRESS);
    console.log('👤 Checking address:', YOUR_ADDRESS);
    
    const balance = await contract.balanceOf(YOUR_ADDRESS);
    console.log('🐱 Your balance:', balance.toString());
    
    const totalSupply = await contract.totalSupply();
    console.log('📊 Total supply:', totalSupply.toString());
    
    const owner = await contract.owner();
    console.log('👑 Contract owner:', owner);
    
    if (balance > 0) {
      console.log('✅ You have kitties! Contract is working.');
    } else {
      console.log('❌ No kitties found. Either not minted or wrong address.');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// checkContract();
console.log('Copy this function to browser console to test:');
console.log(checkContract.toString());
