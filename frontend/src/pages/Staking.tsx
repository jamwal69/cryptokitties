import React from 'react';

const Staking: React.FC = () => {
  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
      <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 style={{ 
          fontSize: '3.5rem', 
          fontWeight: 'bold', 
          background: 'linear-gradient(45deg, #0080ff, #8000ff)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          marginBottom: '1rem',
          fontFamily: 'monospace',
          letterSpacing: '2px',
          textShadow: '0 0 30px rgba(0, 128, 255, 0.5)'
        }}>
          � NEURAL STAKING
        </h1>
        <p style={{ 
          color: 'rgba(255, 255, 255, 0.8)', 
          fontSize: '1.3rem',
          fontFamily: 'monospace'
        }}>
          Quantum yield farming with genetic reward multipliers
        </p>
      </div>

      <div style={{ textAlign: 'center', padding: '4rem' }}>
        <div style={{
          background: 'linear-gradient(45deg, rgba(0, 128, 255, 0.2), rgba(128, 0, 255, 0.2))',
          border: '2px solid #0080ff',
          borderRadius: '16px',
          padding: '4rem',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 0 40px rgba(0, 128, 255, 0.3)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Animated geometric patterns */}
          <div style={{
            position: 'absolute',
            top: '20%',
            left: '20%',
            width: '60px',
            height: '60px',
            border: '2px solid #0080ff',
            borderRadius: '50%',
            animation: 'spin 4s linear infinite',
            opacity: 0.3
          }} />
          <div style={{
            position: 'absolute',
            top: '60%',
            right: '20%',
            width: '40px',
            height: '40px',
            border: '2px solid #8000ff',
            transform: 'rotate(45deg)',
            animation: 'spin 3s linear infinite reverse',
            opacity: 0.3
          }} />
          
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{
              fontSize: '4rem',
              marginBottom: '1.5rem',
              textShadow: '0 0 20px #0080ff'
            }}>
              ⚡
            </div>
            <h3 style={{ 
              fontSize: '2rem', 
              fontWeight: 'bold', 
              marginBottom: '1.5rem', 
              color: '#0080ff',
              fontFamily: 'monospace',
              textShadow: '0 0 15px #0080ff'
            }}>
              YIELD PROTOCOLS LOADING
            </h3>
            <p style={{ 
              color: 'rgba(255, 255, 255, 0.9)', 
              marginBottom: '2rem',
              fontSize: '1.1rem',
              fontFamily: 'monospace',
              lineHeight: '1.6'
            }}>
              Advanced staking mechanisms are being deployed with quantum yield calculations,
              <br />genetic rarity multipliers, and neural reward optimization algorithms.
              <br /><br />
              <span style={{ color: '#8000ff' }}>Staking features in development:</span>
              <br />• Genetic rarity-based reward multipliers
              <br />• Quantum compound interest mechanics
              <br />• Neural network yield optimization
              <br />• Cross-dimensional liquidity pools
              <br />• Time-locked enhancement protocols
            </p>
            
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button style={{
                background: 'linear-gradient(45deg, #0080ff, #8000ff)',
                color: 'white',
                padding: '1rem 2rem',
                fontSize: '1rem',
                fontWeight: 'bold',
                fontFamily: 'monospace',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 0 20px rgba(0, 128, 255, 0.5)'
              }}>
              💫 QUANTUM DEPLOYMENT
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Staking;
