import React from 'react';
import KittyVisualization from './KittyVisualization';

interface Kitty {
  tokenId: string;
  generation: number;
  birthTime: number;
  lastBreedTime: number;
  matronId: string;
  sireId: string;
  bodyColor: number;
  eyeColor: number;
  pattern: number;
  accessory: number;
  background: number;
  hasSpecialTrait: boolean;
  strength: number;
  agility: number;
  intelligence: number;
  rarity?: string;
}

interface KittyCardProps {
  kitty: Kitty;
  onSelect?: (kitty: Kitty) => void;
  isSelected?: boolean;
  showDetails?: boolean;
  actionButton?: React.ReactNode;
}

const KittyCard: React.FC<KittyCardProps> = ({
  kitty,
  onSelect,
  isSelected = false,
  showDetails = true,
  actionButton
}) => {
  const getRarityColor = (rarity?: string) => {
    switch (rarity) {
      case 'Common': return 'text-gray-600 bg-gray-100';
      case 'Uncommon': return 'text-green-600 bg-green-100';
      case 'Rare': return 'text-blue-600 bg-blue-100';
      case 'Epic': return 'text-purple-600 bg-purple-100';
      case 'Legendary': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatAge = (birthTime: number) => {
    const age = Date.now() / 1000 - birthTime;
    const days = Math.floor(age / 86400);
    const hours = Math.floor((age % 86400) / 3600);
    
    if (days > 0) {
      return `${days}d ${hours}h`;
    }
    return `${hours}h`;
  };

  const canBreedNow = () => {
    const cooldownEnd = kitty.lastBreedTime + (24 * 60 * 60); // 24 hours in seconds
    return Date.now() / 1000 >= cooldownEnd;
  };

  return (
    <div
      className={`kitty-card cursor-pointer ${
        isSelected ? 'ring-4 ring-primary-500' : ''
      }`}
      onClick={() => onSelect?.(kitty)}
    >
      {/* Kitty Visualization */}
      <div className="flex justify-center p-4 bg-gradient-to-br from-blue-50 to-purple-50">
        <KittyVisualization
          bodyColor={kitty.bodyColor}
          eyeColor={kitty.eyeColor}
          pattern={kitty.pattern}
          accessory={kitty.accessory}
          background={kitty.background}
          hasSpecialTrait={kitty.hasSpecialTrait}
          size="medium"
        />
      </div>

      {/* Kitty Info */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-800">
            Kitty #{kitty.tokenId}
          </h3>
          {kitty.rarity && (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRarityColor(kitty.rarity)}`}>
              {kitty.rarity}
            </span>
          )}
        </div>

        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Generation:</span>
            <span className="font-medium">{kitty.generation}</span>
          </div>
          
          <div className="flex justify-between">
            <span>Age:</span>
            <span className="font-medium">{formatAge(kitty.birthTime)}</span>
          </div>

          {kitty.generation > 0 && (
            <div className="text-xs">
              <div>Parents: #{kitty.matronId} × #{kitty.sireId}</div>
            </div>
          )}
        </div>

        {showDetails && (
          <div className="mt-4 space-y-2">
            {/* Battle Stats */}
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="text-center">
                <div className="font-medium text-red-600">STR</div>
                <div>{kitty.strength}</div>
              </div>
              <div className="text-center">
                <div className="font-medium text-blue-600">AGI</div>
                <div>{kitty.agility}</div>
              </div>
              <div className="text-center">
                <div className="font-medium text-purple-600">INT</div>
                <div>{kitty.intelligence}</div>
              </div>
            </div>

            {/* Traits */}
            <div className="grid grid-cols-2 gap-1 text-xs text-gray-600">
              <div>Body: {kitty.bodyColor}</div>
              <div>Eyes: {kitty.eyeColor}</div>
              <div>Pattern: {kitty.pattern}</div>
              <div>Accessory: {kitty.accessory}</div>
              <div className="col-span-2">Background: {kitty.background}</div>
            </div>

            {/* Special Trait */}
            {kitty.hasSpecialTrait && (
              <div className="text-center">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                  ✨ Special Trait
                </span>
              </div>
            )}

            {/* Breeding Status */}
            <div className="text-center">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                canBreedNow() 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {canBreedNow() ? '🟢 Ready to Breed' : '🔴 Breeding Cooldown'}
              </span>
            </div>
          </div>
        )}

        {/* Action Button */}
        {actionButton && (
          <div className="mt-4">
            {actionButton}
          </div>
        )}
      </div>
    </div>
  );
};

export default KittyCard;
