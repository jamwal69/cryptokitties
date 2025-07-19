import React, { useState } from 'react';
import { useWeb3 } from '../context/Web3Context-full';
import KittyCard from '../components/KittyCard';
import WalletConnection from '../components/WalletConnection';

const MyKittiesPage: React.FC = () => {
  const { account, userKitties, refreshKitties } = useWeb3();
  const [sortBy, setSortBy] = useState<'id' | 'generation' | 'rarity' | 'age'>('id');
  const [filterRarity, setFilterRarity] = useState<string>('all');
  const [selectedKitty, setSelectedKitty] = useState<any>(null);

  if (!account) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">My Kitties</h1>
            <p className="text-gray-600">Connect your wallet to view your CryptoKitties collection</p>
          </div>
          <WalletConnection />
        </div>
      </div>
    );
  }

  // Filter and sort kitties
  const filteredKitties = userKitties
    .filter(kitty => filterRarity === 'all' || kitty.rarity === filterRarity)
    .sort((a, b) => {
      switch (sortBy) {
        case 'id':
          return parseInt(a.tokenId) - parseInt(b.tokenId);
        case 'generation':
          return a.generation - b.generation;
        case 'rarity':
          const rarityOrder = { 'Common': 0, 'Uncommon': 1, 'Rare': 2, 'Epic': 3, 'Legendary': 4 };
          return (rarityOrder[b.rarity as keyof typeof rarityOrder] || 0) - (rarityOrder[a.rarity as keyof typeof rarityOrder] || 0);
        case 'age':
          return b.birthTime - a.birthTime;
        default:
          return 0;
      }
    });

  const rarityStats = userKitties.reduce((acc, kitty) => {
    acc[kitty.rarity || 'Common'] = (acc[kitty.rarity || 'Common'] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">My Kitties Collection</h1>
          <div className="flex items-center justify-between">
            <p className="text-xl text-gray-600">
              You own {userKitties.length} unique CryptoKitties
            </p>
            <button
              onClick={refreshKitties}
              className="btn-secondary flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {userKitties.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-6">🐱</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">No Kitties Yet</h2>
            <p className="text-xl text-gray-600 mb-8">
              You don't have any CryptoKitties in your collection yet.
            </p>
            <div className="space-y-4">
              <p className="text-gray-600">Get started by:</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <div className="card text-center">
                  <div className="text-2xl mb-2">🎁</div>
                  <h3 className="font-bold mb-1">Mint Gen 0</h3>
                  <p className="text-sm text-gray-600">Get a free Generation 0 kitty</p>
                </div>
                <div className="card text-center">
                  <div className="text-2xl mb-2">🏪</div>
                  <h3 className="font-bold mb-1">Marketplace</h3>
                  <p className="text-sm text-gray-600">Buy kitties from other players</p>
                </div>
                <div className="card text-center">
                  <div className="text-2xl mb-2">🧬</div>
                  <h3 className="font-bold mb-1">Breeding</h3>
                  <p className="text-sm text-gray-600">Create new kitties by breeding</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
              <div className="card text-center">
                <div className="text-2xl font-bold text-primary-600">{userKitties.length}</div>
                <div className="text-sm text-gray-600">Total Kitties</div>
              </div>
              {Object.entries(rarityStats).map(([rarity, count]) => (
                <div key={rarity} className="card text-center">
                  <div className={`text-2xl font-bold ${
                    rarity === 'Common' ? 'text-gray-600' :
                    rarity === 'Uncommon' ? 'text-green-600' :
                    rarity === 'Rare' ? 'text-blue-600' :
                    rarity === 'Epic' ? 'text-purple-600' : 'text-yellow-600'
                  }`}>
                    {count}
                  </div>
                  <div className="text-sm text-gray-600">{rarity}</div>
                </div>
              ))}
            </div>

            {/* Filters and Sorting */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <div className="flex flex-wrap items-center gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sort by:
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="id">Token ID</option>
                    <option value="generation">Generation</option>
                    <option value="rarity">Rarity</option>
                    <option value="age">Age</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Filter by rarity:
                  </label>
                  <select
                    value={filterRarity}
                    onChange={(e) => setFilterRarity(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="all">All Rarities</option>
                    <option value="Common">Common</option>
                    <option value="Uncommon">Uncommon</option>
                    <option value="Rare">Rare</option>
                    <option value="Epic">Epic</option>
                    <option value="Legendary">Legendary</option>
                  </select>
                </div>

                <div className="flex-1"></div>

                <div className="text-sm text-gray-600">
                  Showing {filteredKitties.length} of {userKitties.length} kitties
                </div>
              </div>
            </div>

            {/* Kitties Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredKitties.map((kitty) => (
                <KittyCard
                  key={kitty.tokenId}
                  kitty={kitty}
                  onSelect={setSelectedKitty}
                  isSelected={selectedKitty?.tokenId === kitty.tokenId}
                  actionButton={
                    <div className="grid grid-cols-2 gap-2">
                      <button className="btn-primary text-xs py-1">
                        Breed
                      </button>
                      <button className="btn-secondary text-xs py-1">
                        Sell
                      </button>
                    </div>
                  }
                />
              ))}
            </div>

            {filteredKitties.length === 0 && (
              <div className="text-center py-16">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">No kitties match your filters</h3>
                <p className="text-gray-600">Try adjusting your filter settings</p>
              </div>
            )}
          </>
        )}

        {/* Selected Kitty Detail Modal */}
        {selectedKitty && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-screen overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold">Kitty #{selectedKitty.tokenId}</h2>
                  <button
                    onClick={() => setSelectedKitty(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <KittyCard kitty={selectedKitty} showDetails={false} />
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-bold text-lg mb-2">Details</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Generation:</span>
                          <span className="font-medium">{selectedKitty.generation}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Rarity:</span>
                          <span className="font-medium">{selectedKitty.rarity}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Birth Date:</span>
                          <span className="font-medium">
                            {new Date(selectedKitty.birthTime * 1000).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <button className="btn-primary">
                        List for Sale
                      </button>
                      <button className="btn-secondary">
                        Breed
                      </button>
                      <button className="btn-secondary">
                        Battle
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyKittiesPage;
