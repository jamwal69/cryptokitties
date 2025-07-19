import React from 'react';
import { useWeb3 } from '../context/Web3Context-full';

const WalletConnection: React.FC = () => {
  const { 
    account, 
    isConnected, 
    isConnecting, 
    chainId, 
    kittyBalance,
    connectWallet, 
    disconnectWallet, 
    switchNetwork,
    claimInitialTokens
  } = useWeb3();

  const POLYGON_MUMBAI_CHAIN_ID = 80001;
  const isCorrectNetwork = chainId === POLYGON_MUMBAI_CHAIN_ID;

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center space-y-4">
        <button
          onClick={connectWallet}
          disabled={isConnecting}
          className="btn-primary flex items-center space-x-2 text-lg px-8 py-3"
        >
          {isConnecting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Connecting...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>Connect Wallet</span>
            </>
          )}
        </button>
        
        <p className="text-gray-600 text-center max-w-md">
          Connect your MetaMask wallet to start collecting, breeding, and trading CryptoKitties!
        </p>
      </div>
    );
  }

  if (!isCorrectNetwork) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="flex-shrink-0">
            <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.083 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-medium text-yellow-800">Wrong Network</h3>
            <p className="text-yellow-700">Please switch to Polygon Mumbai testnet to continue.</p>
          </div>
        </div>
        
        <button
          onClick={switchNetwork}
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
        >
          Switch to Mumbai Testnet
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Wallet Connected</h3>
          <p className="text-sm text-gray-600">
            {account?.slice(0, 6)}...{account?.slice(-4)}
          </p>
        </div>
        <button
          onClick={disconnectWallet}
          className="text-red-600 hover:text-red-800 text-sm underline"
        >
          Disconnect
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">K</span>
            </div>
            <span className="font-medium text-gray-700">KITTY Balance</span>
          </div>
          <span className="font-bold text-lg text-gray-800">
            {parseFloat(kittyBalance).toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </span>
        </div>

        <button
          onClick={claimInitialTokens}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200"
        >
          🎁 Claim Free KITTY Tokens
        </button>

        <div className="text-xs text-gray-500 text-center">
          Need testnet MATIC? Get some from the{' '}
          <a 
            href="https://faucet.polygon.technology/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Polygon Faucet
          </a>
        </div>
      </div>
    </div>
  );
};

export default WalletConnection;
