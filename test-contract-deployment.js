const { ethers } = require('ethers');

// Contract details
const contractAddress = '0xba9847de247D2930bc8CFD9CfB26fa4e3b93cF59';
const rpcUrl = 'https://sepolia.infura.io/v3/your-project-id'; // We'll use a public RPC

// Minimal ABI for testing - matching actual contract
const testABI = [
  "function gen0Minted() view returns (uint256)",
  "function owner() view returns (address)",
  "function balanceOf(address owner) view returns (uint256)",
  "function getKittiesByOwner(address owner) external view returns (uint256[] memory)"
];

async function testContract() {
  try {
    console.log('🔍 Testing contract deployment...');
    console.log('📍 Contract Address:', contractAddress);
    
    // Use multiple RPC endpoints for reliability
    const rpcEndpoints = [
      'https://ethereum-sepolia-rpc.publicnode.com',
      'https://sepolia.gateway.tenderly.co',
      'https://rpc2.sepolia.org',
      'https://rpc.sepolia.org'
    ];
    
    let provider = null;
    for (const rpc of rpcEndpoints) {
      try {
        console.log(`🔄 Trying RPC: ${rpc}`);
        provider = new ethers.JsonRpcProvider(rpc);
        await provider.getNetwork(); // Test connection
        console.log(`✅ Connected to: ${rpc}`);
        break;
      } catch (error) {
        console.log(`❌ Failed: ${rpc} - ${error.message}`);
        continue;
      }
    }
    
    if (!provider) {
      console.log('❌ All RPC endpoints failed!');
      return;
    }
    
    // Check if contract exists
    const code = await provider.getCode(contractAddress);
    console.log('📋 Contract code length:', code.length);
    
    if (code === '0x') {
      console.log('❌ No contract found at this address!');
      return;
    }
    
    console.log('✅ Contract exists!');
    
    // Try to create contract instance
    const contract = new ethers.Contract(contractAddress, testABI, provider);
    
    // Test gen0Minted call
    console.log('🧪 Testing gen0Minted call...');
    const gen0Minted = await contract.gen0Minted();
    console.log('✅ Gen0 Minted:', gen0Minted.toString());
    
    // Test owner call
    console.log('🧪 Testing owner call...');
    const owner = await contract.owner();
    console.log('✅ Owner:', owner);
    
    // Test with a sample address balance
    console.log('🧪 Testing balanceOf call...');
    const balance = await contract.balanceOf(owner);
    console.log('✅ Owner Balance:', balance.toString());
    
  } catch (error) {
    console.error('❌ Contract test failed:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      data: error.data
    });
  }
}

testContract();
