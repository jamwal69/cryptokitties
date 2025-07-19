import React from 'react';
import { useWeb3 } from '../context/Web3Context-full';
import WalletConnection from '../components/WalletConnection';
import KittyCard from '../components/KittyCard';

const HomePage: React.FC = () => {
  const { account, userKitties } = useWeb3();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600 mb-4">
              CryptoKitties
            </h1>
            <p className="text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Collect, breed, and battle unique digital cats on the blockchain. 
              Each kitty is a one-of-a-kind NFT with special traits and abilities.
            </p>
            
            {!account ? (
              <div className="max-w-md mx-auto">
                <WalletConnection />
              </div>
            ) : (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  <div className="card text-center">
                    <div className="text-4xl mb-4">🐱</div>
                    <h3 className="text-xl font-bold mb-2">Collect</h3>
                    <p className="text-gray-600">
                      Own unique digital cats with different traits and rarities
                    </p>
                  </div>
                  
                  <div className="card text-center">
                    <div className="text-4xl mb-4">🧬</div>
                    <h3 className="text-xl font-bold mb-2">Breed</h3>
                    <p className="text-gray-600">
                      Create new kitties by breeding your cats together
                    </p>
                  </div>
                  
                  <div className="card text-center">
                    <div className="text-4xl mb-4">⚔️</div>
                    <h3 className="text-xl font-bold mb-2">Battle</h3>
                    <p className="text-gray-600">
                      Fight other kitties and earn KITTY token rewards
                    </p>
                  </div>
                </div>
                
                <WalletConnection />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* User's Kitties Section */}
      {account && userKitties.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Your Kitties</h2>
            <p className="text-xl text-gray-600">
              You own {userKitties.length} unique CryptoKitties
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {userKitties.slice(0, 8).map((kitty) => (
              <KittyCard 
                key={kitty.tokenId} 
                kitty={kitty}
                showDetails={false}
              />
            ))}
          </div>
          
          {userKitties.length > 8 && (
            <div className="text-center mt-8">
              <button className="btn-primary">
                View All Kitties ({userKitties.length})
              </button>
            </div>
          )}
        </div>
      )}

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Game Features</h2>
            <p className="text-xl text-gray-600">
              Discover all the amazing things you can do with your CryptoKitties
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Advanced Genetics</h3>
              <p className="text-gray-600">
                Sophisticated breeding algorithm with trait inheritance and mutations
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏪</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Marketplace</h3>
              <p className="text-gray-600">
                Buy, sell, and auction your kitties with other players
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏦</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Staking</h3>
              <p className="text-gray-600">
                Stake your kitties to earn passive KITTY token rewards
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Tournaments</h3>
              <p className="text-gray-600">
                Compete in battles and climb the leaderboards
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Getting Started Section */}
      {!account && (
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-8">Ready to Start?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
              <div>
                <div className="text-6xl mb-4">1️⃣</div>
                <h3 className="text-xl font-bold mb-2">Connect Wallet</h3>
                <p>Link your MetaMask wallet to get started</p>
              </div>
              
              <div>
                <div className="text-6xl mb-4">2️⃣</div>
                <h3 className="text-xl font-bold mb-2">Get Tokens</h3>
                <p>Claim free KITTY tokens and get testnet MATIC</p>
              </div>
              
              <div>
                <div className="text-6xl mb-4">3️⃣</div>
                <h3 className="text-xl font-bold mb-2">Start Playing</h3>
                <p>Mint your first kitty and begin your journey</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rarity Information */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Kitty Rarities</h2>
            <p className="text-xl text-gray-600">
              Each kitty has different traits that determine its rarity
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="card text-center">
              <div className="w-4 h-4 bg-gray-400 rounded-full mx-auto mb-2"></div>
              <h4 className="font-bold text-gray-600">Common</h4>
              <p className="text-sm text-gray-500">Basic traits</p>
            </div>
            
            <div className="card text-center">
              <div className="w-4 h-4 bg-green-400 rounded-full mx-auto mb-2"></div>
              <h4 className="font-bold text-green-600">Uncommon</h4>
              <p className="text-sm text-gray-500">1+ mid-tier traits</p>
            </div>
            
            <div className="card text-center">
              <div className="w-4 h-4 bg-blue-400 rounded-full mx-auto mb-2"></div>
              <h4 className="font-bold text-blue-600">Rare</h4>
              <p className="text-sm text-gray-500">1+ high-tier traits</p>
            </div>
            
            <div className="card text-center">
              <div className="w-4 h-4 bg-purple-400 rounded-full mx-auto mb-2"></div>
              <h4 className="font-bold text-purple-600">Epic</h4>
              <p className="text-sm text-gray-500">1+ max-tier traits</p>
            </div>
            
            <div className="card text-center">
              <div className="w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mx-auto mb-2"></div>
              <h4 className="font-bold text-yellow-600">Legendary</h4>
              <p className="text-sm text-gray-500">Special mutations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
