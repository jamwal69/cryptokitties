import React from 'react';

interface KittyVisualizationProps {
  bodyColor: number;
  eyeColor: number;
  pattern: number;
  accessory: number;
  background: number;
  hasSpecialTrait: boolean;
  size?: 'small' | 'medium' | 'large';
}

const KittyVisualization: React.FC<KittyVisualizationProps> = ({
  bodyColor,
  eyeColor,
  pattern,
  accessory,
  background,
  hasSpecialTrait,
  size = 'medium'
}) => {
  // Color palettes for each trait
  const bodyColors = [
    '#FFE4E1', '#F0F8FF', '#F5FFFA', '#FFF8DC',
    '#FFE4B5', '#DDA0DD', '#E0E0E0', '#FF6347'
  ];
  
  const eyeColors = [
    '#00BFFF', '#32CD32', '#FFD700', '#FF69B4', 
    '#FF4500', '#8A2BE2'
  ];
  
  const patternColors = [
    '#FFFFFF', '#696969', '#2F4F4F', '#8B4513', '#4B0082'
  ];
  
  const backgroundColors = [
    '#F0F8FF', '#E6E6FA', '#FFF0F5'
  ];

  const getSizeClass = () => {
    switch (size) {
      case 'small': return 'w-16 h-16';
      case 'medium': return 'w-32 h-32';
      case 'large': return 'w-48 h-48';
      default: return 'w-32 h-32';
    }
  };

  const bodyColorHex = bodyColors[bodyColor] || bodyColors[0];
  const eyeColorHex = eyeColors[eyeColor] || eyeColors[0];
  const patternColorHex = patternColors[pattern] || patternColors[0];
  const backgroundColorHex = backgroundColors[background] || backgroundColors[0];

  return (
    <div className={`${getSizeClass()} relative`}>
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        style={{ backgroundColor: backgroundColorHex }}
      >
        {/* Cat body */}
        <ellipse
          cx="100"
          cy="140"
          rx="60"
          ry="40"
          fill={bodyColorHex}
          stroke="#000"
          strokeWidth="2"
        />
        
        {/* Cat head */}
        <circle
          cx="100"
          cy="80"
          r="45"
          fill={bodyColorHex}
          stroke="#000"
          strokeWidth="2"
        />
        
        {/* Ears */}
        <polygon
          points="70,50 80,20 90,50"
          fill={bodyColorHex}
          stroke="#000"
          strokeWidth="2"
        />
        <polygon
          points="110,50 120,20 130,50"
          fill={bodyColorHex}
          stroke="#000"
          strokeWidth="2"
        />
        
        {/* Inner ears */}
        <polygon
          points="72,45 78,28 85,45"
          fill="#FFB6C1"
        />
        <polygon
          points="115,45 122,28 128,45"
          fill="#FFB6C1"
        />
        
        {/* Pattern overlay */}
        {pattern > 0 && (
          <>
            <circle
              cx="85"
              cy="70"
              r="8"
              fill={patternColorHex}
              opacity="0.6"
            />
            <circle
              cx="115"
              cy="75"
              r="6"
              fill={patternColorHex}
              opacity="0.6"
            />
            {pattern > 2 && (
              <ellipse
                cx="100"
                cy="100"
                rx="15"
                ry="8"
                fill={patternColorHex}
                opacity="0.6"
              />
            )}
          </>
        )}
        
        {/* Eyes */}
        <ellipse
          cx="85"
          cy="75"
          rx="8"
          ry="12"
          fill="#FFFFFF"
          stroke="#000"
          strokeWidth="1"
        />
        <ellipse
          cx="115"
          cy="75"
          rx="8"
          ry="12"
          fill="#FFFFFF"
          stroke="#000"
          strokeWidth="1"
        />
        
        {/* Eye pupils */}
        <circle
          cx="85"
          cy="78"
          r="4"
          fill={eyeColorHex}
        />
        <circle
          cx="115"
          cy="78"
          r="4"
          fill={eyeColorHex}
        />
        
        {/* Eye shine */}
        <circle
          cx="87"
          cy="76"
          r="1.5"
          fill="#FFFFFF"
        />
        <circle
          cx="117"
          cy="76"
          r="1.5"
          fill="#FFFFFF"
        />
        
        {/* Nose */}
        <polygon
          points="95,85 100,90 105,85 100,82"
          fill="#FFB6C1"
          stroke="#000"
          strokeWidth="1"
        />
        
        {/* Mouth */}
        <path
          d="M100,90 Q90,95 85,90"
          stroke="#000"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M100,90 Q110,95 115,90"
          stroke="#000"
          strokeWidth="2"
          fill="none"
        />
        
        {/* Whiskers */}
        <line x1="50" y1="80" x2="75" y2="85" stroke="#000" strokeWidth="1.5"/>
        <line x1="50" y1="90" x2="75" y2="90" stroke="#000" strokeWidth="1.5"/>
        <line x1="125" y1="85" x2="150" y2="80" stroke="#000" strokeWidth="1.5"/>
        <line x1="125" y1="90" x2="150" y2="90" stroke="#000" strokeWidth="1.5"/>
        
        {/* Accessories */}
        {accessory > 0 && (
          <g>
            {/* Collar */}
            <ellipse
              cx="100"
              cy="120"
              rx="35"
              ry="8"
              fill="#FF6347"
              stroke="#000"
              strokeWidth="2"
            />
            <circle
              cx="100"
              cy="125"
              r="3"
              fill="#FFD700"
              stroke="#000"
              strokeWidth="1"
            />
          </g>
        )}
        
        {accessory > 1 && (
          <g>
            {/* Hat */}
            <ellipse
              cx="100"
              cy="45"
              rx="25"
              ry="15"
              fill="#8B4513"
              stroke="#000"
              strokeWidth="2"
            />
            <ellipse
              cx="100"
              cy="35"
              rx="35"
              ry="8"
              fill="#8B4513"
              stroke="#000"
              strokeWidth="2"
            />
          </g>
        )}
        
        {/* Special trait indicator */}
        {hasSpecialTrait && (
          <g>
            <circle
              cx="180"
              cy="20"
              r="15"
              fill="url(#sparkleGradient)"
              className="animate-pulse"
            />
            <text
              x="180"
              y="25"
              textAnchor="middle"
              fontSize="12"
              fill="#FFFFFF"
              fontWeight="bold"
            >
              ★
            </text>
          </g>
        )}
        
        {/* Gradient definitions */}
        <defs>
          <radialGradient id="sparkleGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#FF6347" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};

export default KittyVisualization;
