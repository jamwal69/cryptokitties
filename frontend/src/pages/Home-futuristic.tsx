import React from 'react';
import { useWeb3 } from '../context/Web3Context-full';

const Home: React.FC = () => {
  const { account, connectWallet, isConnecting } = useWeb3();

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
      {/* Hero Section */}
      <div style={{ 
        textAlign: 'center', 
        padding: '4rem 0 6rem 0',
        position: 'relative'
      }}>
        {/* Glowing orb effect */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(0, 255, 136, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          zIndex: -1,
          animation: 'pulse 4s ease-in-out infinite'
        }} />

        <h1 style={{
          fontSize: '4.5rem',
          fontWeight: 'bold',
          background: 'linear-gradient(45deg, #00ff88, #0080ff, #ff0080, #00ff88)',
          backgroundSize: '300% 300%',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          marginBottom: '1.5rem',
          fontFamily: 'monospace',
          letterSpacing: '3px',
          textShadow: '0 0 30px rgba(0, 255, 136, 0.5)',
          animation: 'gradient 3s ease infinite'
        }}>
          CRYPTO KITTIES
        </h1>
        
        <h2 style={{
          fontSize: '2rem',
          color: '#ffffff',
          marginBottom: '2rem',
          fontFamily: 'monospace',
          letterSpacing: '2px',
          textShadow: '0 0 20px rgba(255, 255, 255, 0.3)'
        }}>
          ⚡ NEXT-GEN DIGITAL EVOLUTION ⚡
        </h2>

        <p style={{
          fontSize: '1.3rem',
          color: 'rgba(255, 255, 255, 0.8)',
          marginBottom: '3rem',
          maxWidth: '800px',
          margin: '0 auto 3rem auto',
          lineHeight: '1.8',
          fontFamily: 'monospace'
        }}>
          Experience the future of blockchain gaming with advanced genetic algorithms, 
          quantum-level breeding mechanics, and cyberpunk battle systems. 
          Each CryptoKitty is a unique digital lifeform with emergent AI traits.
        </p>

        {/* Connection Status */}
        {!account ? (
          <div style={{
            background: 'linear-gradient(45deg, rgba(255, 0, 128, 0.2), rgba(0, 128, 255, 0.2))',
            border: '2px solid',
            borderImage: 'linear-gradient(45deg, #ff0080, #0080ff) 1',
            borderRadius: '16px',
            padding: '3rem',
            marginBottom: '3rem',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 0 40px rgba(255, 0, 128, 0.3)'
          }}>
            <h3 style={{
              fontSize: '1.8rem',
              fontWeight: 'bold',
              marginBottom: '1.5rem',
              color: '#00ff88',
              fontFamily: 'monospace',
              textShadow: '0 0 15px #00ff88'
            }}>
              🔐 NEURAL LINK REQUIRED
            </h3>
            <p style={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: '1.1rem',
              marginBottom: '2rem',
              fontFamily: 'monospace'
            }}>
              Connect your digital wallet to access the CryptoKitties metaverse.
              <br />Network: Sepolia Testnet | Chain ID: 11155111
            </p>
            <button
              onClick={connectWallet}
              disabled={isConnecting}
              style={{
                fontSize: '1.2rem',
                fontWeight: 'bold',
                fontFamily: 'monospace',
                letterSpacing: '2px',
                padding: '1rem 3rem',
                background: isConnecting 
                  ? 'linear-gradient(45deg, #333, #555)' 
                  : 'linear-gradient(45deg, #ff0080, #0080ff)',
                color: 'white',
                border: '2px solid',
                borderColor: isConnecting ? '#555' : '#00ff88',
                borderRadius: '12px',
                cursor: isConnecting ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: isConnecting 
                  ? 'none' 
                  : '0 0 25px rgba(0, 255, 136, 0.5)',
                textShadow: isConnecting 
                  ? 'none' 
                  : '0 0 10px rgba(255, 255, 255, 0.8)'
              }}
              onMouseEnter={(e) => {
                if (!isConnecting) {
                  e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 0 35px rgba(0, 255, 136, 0.8)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isConnecting) {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 0 25px rgba(0, 255, 136, 0.5)';
                }
              }}
            >
              {isConnecting ? '⚡ LINKING...' : '🚀 CONNECT WALLET'}
            </button>
          </div>
        ) : (
          <div style={{
            background: 'linear-gradient(45deg, rgba(0, 255, 136, 0.2), rgba(0, 128, 255, 0.2))',
            border: '2px solid #00ff88',
            borderRadius: '16px',
            padding: '3rem',
            marginBottom: '3rem',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 0 40px rgba(0, 255, 136, 0.4)'
          }}>
            <h3 style={{
              fontSize: '1.8rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
              color: '#00ff88',
              fontFamily: 'monospace',
              textShadow: '0 0 15px #00ff88'
            }}>
              ✅ NEURAL LINK ESTABLISHED
            </h3>
            <p style={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: '1.1rem',
              fontFamily: 'monospace',
              wordBreak: 'break-all'
            }}>
              Connected: {account}
            </p>
          </div>
        )}

        {/* Feature Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2rem',
          marginTop: '4rem'
        }}>
          {[
            {
              icon: '🧬',
              title: 'GENETIC ALGORITHMS',
              description: 'Advanced AI-driven breeding with 45/45/10% trait inheritance and quantum mutations',
              color: '#ff0080'
            },
            {
              icon: '⚔️',
              title: 'CYBER BATTLES',
              description: 'Strategic combat system with evolving AI tactics and neural network strategies',
              color: '#0080ff'
            },
            {
              icon: '🏪',
              title: 'QUANTUM MARKETPLACE',
              description: 'Decentralized trading hub with instant transactions and AI price predictions',
              color: '#00ff88'
            },
            {
              icon: '💎',
              title: 'NEURAL STAKING',
              description: 'Stake your kitties to earn rewards and unlock advanced genetic modifications',
              color: '#ff8000'
            }
          ].map((feature, index) => (
            <div
              key={index}
              style={{
                background: `linear-gradient(45deg, rgba(${
                  feature.color === '#ff0080' ? '255, 0, 128' :
                  feature.color === '#0080ff' ? '0, 128, 255' :
                  feature.color === '#00ff88' ? '0, 255, 136' :
                  '255, 128, 0'
                }, 0.1), rgba(0, 0, 0, 0.5))`,
                border: `2px solid ${feature.color}`,
                borderRadius: '16px',
                padding: '2.5rem',
                backdropFilter: 'blur(20px)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                boxShadow: `0 0 20px ${feature.color}40`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                e.currentTarget.style.boxShadow = `0 0 35px ${feature.color}80`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = `0 0 20px ${feature.color}40`;
              }}
            >
              <div style={{
                fontSize: '3rem',
                marginBottom: '1rem',
                textShadow: `0 0 20px ${feature.color}`
              }}>
                {feature.icon}
              </div>
              <h4 style={{
                fontSize: '1.3rem',
                fontWeight: 'bold',
                marginBottom: '1rem',
                color: feature.color,
                fontFamily: 'monospace',
                letterSpacing: '1px',
                textShadow: `0 0 10px ${feature.color}`
              }}>
                {feature.title}
              </h4>
              <p style={{
                color: 'rgba(255, 255, 255, 0.8)',
                lineHeight: '1.6',
                fontFamily: 'monospace',
                fontSize: '0.95rem'
              }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CSS for animations */}
      <style>
        {`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          @keyframes pulse {
            0% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
            50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.1; }
            100% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
          }
        `}
      </style>
    </div>
  );
};

export default Home;
