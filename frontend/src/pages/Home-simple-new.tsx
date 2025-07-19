import React from 'react';
import { useWeb3 } from '../context/Web3Context-full';

const Home: React.FC = () => {
  const { account, connectWallet, isConnecting } = useWeb3();

  return (
    <div style={{ padding: '2rem 0' }}>
      {/* Hero Section */}
      <div style={{ 
        textAlign: 'center', 
        padding: '3rem 0',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        borderRadius: '20px',
        marginBottom: '3rem',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{
          fontSize: '3.5rem',
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          marginBottom: '1rem',
          letterSpacing: '2px'
        }}>
          🐱 CryptoKitties
        </h1>
        
        <h2 style={{
          fontSize: '1.5rem',
          color: '#666',
          marginBottom: '2rem',
          fontWeight: '400'
        }}>
          Collect, Breed & Battle Digital Cats on the Blockchain
        </h2>

        <p style={{
          fontSize: '1.1rem',
          color: '#777',
          maxWidth: '600px',
          margin: '0 auto 2rem auto',
          lineHeight: '1.6'
        }}>
          Experience the future of digital collectibles with advanced genetic algorithms, 
          exciting battles, and a thriving marketplace ecosystem.
        </p>

        {/* Connection Status */}
        {!account ? (
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '16px',
            padding: '2rem',
            marginBottom: '2rem',
            color: 'white'
          }}>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              marginBottom: '1rem'
            }}>
              🔗 Connect Your Wallet
            </h3>
            <p style={{
              marginBottom: '1.5rem',
              opacity: 0.9
            }}>
              Connect your wallet to start collecting and breeding CryptoKitties
              <br />Network: Sepolia Testnet
            </p>
            <button
              onClick={connectWallet}
              disabled={isConnecting}
              style={{
                fontSize: '1.1rem',
                fontWeight: 'bold',
                padding: '0.75rem 2rem',
                background: isConnecting 
                  ? 'rgba(255, 255, 255, 0.2)' 
                  : 'rgba(255, 255, 255, 0.9)',
                color: isConnecting ? 'rgba(255, 255, 255, 0.7)' : '#333',
                border: 'none',
                borderRadius: '12px',
                cursor: isConnecting ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              {isConnecting ? '⏳ Connecting...' : '🚀 Connect Wallet'}
            </button>
          </div>
        ) : (
          <div style={{
            background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
            borderRadius: '16px',
            padding: '2rem',
            marginBottom: '2rem',
            color: 'white'
          }}>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              marginBottom: '1rem'
            }}>
              ✅ Wallet Connected
            </h3>
            <p style={{
              fontFamily: 'monospace',
              fontSize: '0.9rem',
              wordBreak: 'break-all',
              opacity: 0.9
            }}>
              {account}
            </p>
          </div>
        )}
      </div>

      {/* Features Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        marginBottom: '3rem'
      }}>
        {[
          {
            icon: '🧬',
            title: 'Genetic Breeding',
            description: 'Advanced genetic algorithms create unique kitties with traits from parents',
            color: '#667eea'
          },
          {
            icon: '⚔️',
            title: 'Battle System',
            description: 'Strategic combat with stats derived from genetic traits and battle experience',
            color: '#764ba2'
          },
          {
            icon: '🏪',
            title: 'Marketplace',
            description: 'Trade kitties with other players in our decentralized marketplace',
            color: '#4CAF50'
          },
          {
            icon: '💎',
            title: 'Staking Rewards',
            description: 'Stake your kitties to earn tokens and unlock special breeding bonuses',
            color: '#FF6B6B'
          }
        ].map((feature, index) => (
          <div
            key={index}
            style={{
              background: 'white',
              borderRadius: '16px',
              padding: '2rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease',
              cursor: 'pointer',
              border: `3px solid ${feature.color}20`
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            }}
          >
            <div style={{
              fontSize: '3rem',
              marginBottom: '1rem',
              textAlign: 'center'
            }}>
              {feature.icon}
            </div>
            <h4 style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
              color: feature.color,
              textAlign: 'center'
            }}>
              {feature.title}
            </h4>
            <p style={{
              color: '#666',
              lineHeight: '1.6',
              textAlign: 'center'
            }}>
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* Getting Started Section */}
      <div style={{
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        borderRadius: '20px',
        padding: '3rem',
        textAlign: 'center'
      }}>
        <h3 style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          marginBottom: '2rem',
          color: '#333'
        }}>
          🚀 Ready to Start Your Journey?
        </h3>
        <p style={{
          fontSize: '1.1rem',
          color: '#666',
          marginBottom: '2rem',
          maxWidth: '600px',
          margin: '0 auto 2rem auto',
          lineHeight: '1.6'
        }}>
          Join thousands of players in the ultimate blockchain gaming experience. 
          Collect rare kitties, master the breeding mechanics, and dominate the battlefield!
        </p>
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <a 
            href="/my-kitties"
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '12px',
              textDecoration: 'none',
              fontWeight: 'bold',
              transition: 'transform 0.3s ease',
              display: 'inline-block'
            }}
          >
            😺 View My Kitties
          </a>
          <a 
            href="/marketplace"
            style={{
              background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '12px',
              textDecoration: 'none',
              fontWeight: 'bold',
              transition: 'transform 0.3s ease',
              display: 'inline-block'
            }}
          >
            🛒 Explore Marketplace
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
