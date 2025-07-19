import React from 'react';

const Marketplace: React.FC = () => {
  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
      <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 style={{ 
          fontSize: '3.5rem', 
          fontWeight: 'bold', 
          background: 'linear-gradient(45deg, #00ff88, #0080ff)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          marginBottom: '1rem',
          fontFamily: 'monospace',
          letterSpacing: '2px',
          textShadow: '0 0 30px rgba(0, 255, 136, 0.5)'
        }}>
          🛒 QUANTUM MARKETPLACE
        </h1>
        <p style={{ 
          color: 'rgba(255, 255, 255, 0.8)', 
          fontSize: '1.3rem',
          fontFamily: 'monospace'
        }}>
          Trade CryptoKitties in the decentralized metaverse
        </p>
      </div>

      <div style={{ textAlign: 'center', padding: '4rem' }}>
        <div style={{
          background: 'linear-gradient(45deg, rgba(0, 255, 136, 0.2), rgba(0, 128, 255, 0.2))',
          border: '2px solid #00ff88',
          borderRadius: '16px',
          padding: '4rem',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 0 40px rgba(0, 255, 136, 0.3)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Animated background pattern */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0, 255, 136, 0.1) 10px, rgba(0, 255, 136, 0.1) 20px)',
            animation: 'slide 3s linear infinite'
          }} />
          
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{
              fontSize: '4rem',
              marginBottom: '1.5rem',
              textShadow: '0 0 20px #00ff88'
            }}>
              🚧
            </div>
            <h3 style={{ 
              fontSize: '2rem', 
              fontWeight: 'bold', 
              marginBottom: '1.5rem', 
              color: '#00ff88',
              fontFamily: 'monospace',
              textShadow: '0 0 15px #00ff88'
            }}>
              NEURAL SYSTEMS INITIALIZING
            </h3>
            <p style={{ 
              color: 'rgba(255, 255, 255, 0.9)', 
              marginBottom: '2rem',
              fontSize: '1.1rem',
              fontFamily: 'monospace',
              lineHeight: '1.6'
            }}>
              The quantum marketplace is being constructed with advanced AI trading algorithms,
              <br />real-time price predictions, and instant blockchain settlements.
              <br /><br />
              <span style={{ color: '#0080ff' }}>Features in development:</span>
              <br />• Instant NFT trading with zero gas fees
              <br />• AI-powered price recommendations
              <br />• Genetic compatibility matching
              <br />• Quantum auction mechanics
            </p>
            
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button style={{
                background: 'linear-gradient(45deg, #00ff88, #0080ff)',
                color: 'black',
                padding: '1rem 2rem',
                fontSize: '1rem',
                fontWeight: 'bold',
                fontFamily: 'monospace',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 0 20px rgba(0, 255, 136, 0.5)'
              }}>
                📡 COMING SOON
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes slide {
            0% { transform: translateX(-20px); }
            100% { transform: translateX(20px); }
          }
        `}
      </style>
    </div>
  );
};

export default Marketplace;
