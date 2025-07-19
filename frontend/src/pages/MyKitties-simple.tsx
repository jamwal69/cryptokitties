import React from 'react';
import { useWeb3 } from '../context/Web3Context-full';

interface Kitty {
  tokenId: string;
  generation: number;
  bodyColor: string;
  eyeColor: string;
  pattern: string;
  strength: number;
  agility: number;
  intelligence: number;
  rarity?: string;
}

interface DebugInfo {
  network: string;
  balance: string;
  totalSupply: string;
  owner: string;
  userAddress: string;
  timestamp: string;
}

const MyKittiesPage: React.FC = () => {
  const { account, connectWallet, isConnecting, userKitties, loading, mintKitty, isMinting, refreshKitties, testContract } = useWeb3();
  const [debugInfo, setDebugInfo] = React.useState<DebugInfo | null>(null);

  const forceRefresh = async () => {
    console.log('🔄 Force refresh triggered');
    setDebugInfo(null);
    try {
      await refreshKitties();
      const timestamp = new Date().toLocaleTimeString();
      console.log(`✅ Force refresh completed at ${timestamp}`);
    } catch (error) {
      console.error('❌ Force refresh error:', error);
    }
  };

  const handleTestContract = async () => {
    console.log('🧪 Testing contract...');
    try {
      const result = await testContract();
      if (result) {
        setDebugInfo({
          network: 'Sepolia Testnet',
          balance: result.balance || '0',
          totalSupply: result.totalSupply || '0',
          owner: result.owner || 'Unknown',
          userAddress: result.userAddress || account || 'Not connected',
          timestamp: new Date().toLocaleTimeString()
        });
        console.log('✅ Contract test completed:', result);
      }
    } catch (error) {
      console.error('❌ Contract test failed:', error);
    }
  };

  // Helper function to generate visual representation
  const generateVisualization = (kitty: Kitty) => {
    const colorMap: { [key: string]: string } = {
      'red': '#ff4444', 'blue': '#4444ff', 'green': '#44ff44', 'yellow': '#ffff44',
      'purple': '#ff44ff', 'orange': '#ff8844', 'pink': '#ff88cc', 'white': '#ffffff',
      'black': '#444444', 'brown': '#8b4513', 'gray': '#888888', 'silver': '#c0c0c0'
    };

    return {
      backgroundColor: colorMap[kitty.bodyColor.toLowerCase()] || '#888888',
      eyeColor: colorMap[kitty.eyeColor.toLowerCase()] || '#ffffff',
      patternIcon: kitty.pattern === 'stripes' ? '🦓' : kitty.pattern === 'spots' ? '🐆' : '🐱'
    };
  };

  const getRarityColor = (rarity?: string) => {
    switch (rarity) {
      case 'Common': return '#888888';
      case 'Uncommon': return '#00ff88';
      case 'Rare': return '#0080ff';
      case 'Epic': return '#8000ff';
      case 'Legendary': return '#ff8000';
      default: return '#888888';
    }
  };

  if (!account) {
    return (
      <div style={{ 
        minHeight: '80vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, rgba(0, 0, 20, 0.9), rgba(20, 0, 40, 0.9))'
      }}>
        <div style={{
          background: 'linear-gradient(45deg, rgba(255, 0, 128, 0.2), rgba(0, 128, 255, 0.2))',
          border: '3px solid #ff0080',
          borderRadius: '20px',
          padding: '4rem 3rem',
          textAlign: 'center',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 0 50px rgba(255, 0, 128, 0.3)'
        }}>
          <h2 style={{ 
            fontSize: '2.5rem', 
            marginBottom: '2rem', 
            background: 'linear-gradient(45deg, #ff0080, #00ff88)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            fontFamily: 'monospace',
            fontWeight: 'bold'
          }}>
            🔐 ACCESS REQUIRED
          </h2>
          <p style={{ 
            marginBottom: '2rem', 
            fontSize: '1.2rem', 
            color: 'rgba(255, 255, 255, 0.8)',
            fontFamily: 'monospace'
          }}>
            Connect your wallet to access your CryptoKitties collection
          </p>
          <button
            onClick={connectWallet}
            disabled={isConnecting}
            style={{
              background: 'linear-gradient(45deg, #ff0080, #8000ff)',
              color: 'white',
              padding: '1rem 2.5rem',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              fontFamily: 'monospace',
              letterSpacing: '1px',
              border: '2px solid #00ff88',
              borderRadius: '12px',
              cursor: isConnecting ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 0 30px rgba(255, 0, 128, 0.5)',
              textShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
              opacity: isConnecting ? 0.7 : 1
            }}
          >
            {isConnecting ? '🔄 CONNECTING...' : '🚀 CONNECT WALLET'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
      {/* Header */}
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
          🐱 MY DIGITAL COMPANIONS
        </h1>
        <p style={{ 
          color: 'rgba(255, 255, 255, 0.8)', 
          fontSize: '1.3rem',
          fontFamily: 'monospace'
        }}>
          Your collection of genetically evolved CryptoKitties
        </p>
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <div style={{
            background: 'linear-gradient(45deg, rgba(0, 255, 136, 0.2), rgba(0, 128, 255, 0.2))',
            border: '2px solid #00ff88',
            borderRadius: '16px',
            padding: '3rem',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 0 40px rgba(0, 255, 136, 0.3)'
          }}>
            <div style={{
              fontSize: '3rem',
              marginBottom: '1rem',
              animation: 'spin 1s linear infinite'
            }}>
              🔄
            </div>
            <h3 style={{ 
              fontSize: '1.5rem', 
              fontWeight: 'bold', 
              marginBottom: '1rem', 
              color: '#00ff88',
              fontFamily: 'monospace',
              textShadow: '0 0 15px #00ff88'
            }}>
              SCANNING BLOCKCHAIN...
            </h3>
            <p style={{ 
              color: 'rgba(255, 255, 255, 0.8)', 
              fontSize: '1rem',
              fontFamily: 'monospace'
            }}>
              Retrieving your digital companions from the Sepolia network...
            </p>
          </div>
        </div>
      )}

      {!loading && userKitties.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <div style={{
            background: 'linear-gradient(45deg, rgba(255, 128, 0, 0.2), rgba(255, 0, 128, 0.2))',
            border: '2px solid #ff8000',
            borderRadius: '16px',
            padding: '4rem',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 0 40px rgba(255, 128, 0, 0.3)'
          }}>
            <h3 style={{ 
              fontSize: '2rem', 
              fontWeight: 'bold', 
              marginBottom: '1.5rem', 
              color: '#ff8000',
              fontFamily: 'monospace',
              textShadow: '0 0 15px #ff8000'
            }}>
              😿 EMPTY COLLECTION DETECTED
            </h3>
            <p style={{ 
              color: 'rgba(255, 255, 255, 0.8)', 
              marginBottom: '2.5rem',
              fontSize: '1.1rem',
              fontFamily: 'monospace'
            }}>
              Your digital stable is empty. Begin your genetic experiments by acquiring your first CryptoKitty!
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={mintKitty}
                disabled={isMinting}
                style={{
                  background: 'linear-gradient(45deg, #ff8000, #ff0080)',
                  color: 'white',
                  padding: '1rem 2.5rem',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  fontFamily: 'monospace',
                  letterSpacing: '1px',
                  border: '2px solid #00ff88',
                  borderRadius: '12px',
                  cursor: isMinting ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 0 25px rgba(255, 128, 0, 0.5)',
                  textShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
                  opacity: isMinting ? 0.7 : 1
                }}
                onMouseEnter={(e) => {
                  if (!isMinting) {
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 0 35px rgba(255, 128, 0, 0.8)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isMinting) {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 0 25px rgba(255, 128, 0, 0.5)';
                  }
                }}
              >
                {isMinting ? '🔄 MINTING...' : '🎭 MINT GENESIS KITTY'}
              </button>
              <button
                onClick={forceRefresh}
                disabled={loading}
                style={{
                  background: 'linear-gradient(45deg, #0080ff, #00ff88)',
                  color: 'white',
                  padding: '1rem 2rem',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  fontFamily: 'monospace',
                  letterSpacing: '1px',
                  border: '2px solid #ff0080',
                  borderRadius: '12px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 0 25px rgba(0, 128, 255, 0.5)',
                  textShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
                  opacity: loading ? 0.7 : 1
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 0 35px rgba(0, 128, 255, 0.8)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 0 25px rgba(0, 128, 255, 0.5)';
                  }
                }}
              >
                {loading ? '🔄 LOADING...' : '🔄 FORCE REFRESH'}
              </button>
              <button
                onClick={handleTestContract}
                style={{
                  background: 'linear-gradient(45deg, #ff0080, #8000ff)',
                  color: 'white',
                  padding: '1rem 2rem',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  fontFamily: 'monospace',
                  letterSpacing: '1px',
                  border: '2px solid #ff8000',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 0 25px rgba(255, 0, 128, 0.5)',
                  textShadow: '0 0 10px rgba(255, 255, 255, 0.8)'
                }}
              >
                🧪 TEST CONTRACT
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Debug Info Section */}
          {debugInfo && (
            <div style={{
              background: 'rgba(0, 255, 136, 0.1)',
              border: '2px solid #00ff88',
              borderRadius: '16px',
              padding: '2rem',
              marginBottom: '2rem',
              fontFamily: 'monospace',
              fontSize: '1rem',
              color: '#00ff88',
              textAlign: 'center',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 0 30px rgba(0, 255, 136, 0.3)'
            }}>
              <div style={{
                fontSize: '1.3rem',
                fontWeight: 'bold',
                marginBottom: '1rem',
                textShadow: '0 0 15px rgba(0, 255, 136, 0.8)'
              }}>
                📊 BLOCKCHAIN STATUS
              </div>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
                textAlign: 'left'
              }}>
                <div>🔗 <strong>Network:</strong> {debugInfo.network}</div>
                <div>💰 <strong>Balance:</strong> {debugInfo.balance}</div>
                <div>📦 <strong>Total Supply:</strong> {debugInfo.totalSupply}</div>
                <div>👤 <strong>Owner:</strong> {debugInfo.owner}</div>
                <div>🎯 <strong>Your Address:</strong> {debugInfo.userAddress}</div>
                <div>⏰ <strong>Last Check:</strong> {debugInfo.timestamp}</div>
              </div>
              
              <div style={{
                marginTop: '1.5rem',
                display: 'flex',
                gap: '1rem',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}>
                <button
                  onClick={handleTestContract}
                  disabled={loading}
                  style={{
                    background: 'linear-gradient(45deg, #ff0080, #8000ff)',
                    color: 'white',
                    padding: '0.8rem 1.5rem',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    fontFamily: 'monospace',
                    letterSpacing: '1px',
                    border: '2px solid #00ff88',
                    borderRadius: '10px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 0 20px rgba(255, 0, 128, 0.5)',
                    textShadow: '0 0 8px rgba(255, 255, 255, 0.8)',
                    opacity: loading ? 0.7 : 1
                  }}
                >
                  {loading ? '🔍 TESTING...' : '🔍 TEST CONTRACT'}
                </button>

                <button
                  onClick={forceRefresh}
                  disabled={loading}
                  style={{
                    background: 'linear-gradient(45deg, #0080ff, #00ff88)',
                    color: 'white',
                    padding: '0.8rem 1.5rem',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    fontFamily: 'monospace',
                    letterSpacing: '1px',
                    border: '2px solid #ff0080',
                    borderRadius: '10px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 0 20px rgba(0, 128, 255, 0.5)',
                    textShadow: '0 0 8px rgba(255, 255, 255, 0.8)',
                    opacity: loading ? 0.7 : 1
                  }}
                >
                  {loading ? '🔄 LOADING...' : '🔄 FORCE REFRESH'}
                </button>
              </div>
            </div>
          )}

          {/* Collection Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem'
          }}>
            {[
              { label: 'TOTAL KITTIES', value: userKitties.length, color: '#00ff88' },
              { label: 'GENERATIONS', value: new Set(userKitties.map((k: any) => k.generation)).size, color: '#0080ff' },
              { label: 'RARE+', value: userKitties.filter((k: any) => ['Rare', 'Epic', 'Legendary'].includes(k.rarity || '')).length, color: '#ff0080' },
              { label: 'AVG POWER', value: Math.round(userKitties.reduce((sum: any, k: any) => sum + k.strength + k.agility + k.intelligence, 0) / userKitties.length), color: '#ff8000' }
            ].map((stat, index) => (
              <div
                key={index}
                style={{
                  background: `linear-gradient(45deg, rgba(${
                    stat.color === '#00ff88' ? '0, 255, 136' :
                    stat.color === '#0080ff' ? '0, 128, 255' :
                    stat.color === '#ff0080' ? '255, 0, 128' :
                    '255, 128, 0'
                  }, 0.1), rgba(0, 0, 0, 0.5))`,
                  border: `2px solid ${stat.color}`,
                  borderRadius: '12px',
                  padding: '1.5rem',
                  textAlign: 'center',
                  backdropFilter: 'blur(20px)',
                  boxShadow: `0 0 20px ${stat.color}30`
                }}
              >
                <div style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  color: stat.color,
                  fontFamily: 'monospace',
                  textShadow: `0 0 10px ${stat.color}`,
                  marginBottom: '0.5rem'
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: '0.9rem',
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontFamily: 'monospace',
                  letterSpacing: '1px'
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Kitties Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            {userKitties.map((kitty: Kitty) => {
              const visualization = generateVisualization(kitty);
              const rarityColor = getRarityColor(kitty.rarity);
              
              return (
                <div
                  key={kitty.tokenId}
                  style={{
                    background: 'linear-gradient(145deg, rgba(0, 0, 0, 0.7), rgba(40, 40, 60, 0.4))',
                    border: `3px solid ${rarityColor}`,
                    borderRadius: '20px',
                    padding: '1.5rem',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(20px)',
                    boxShadow: `0 10px 30px ${rarityColor}30`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                    e.currentTarget.style.boxShadow = `0 20px 50px ${rarityColor}50`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = `0 10px 30px ${rarityColor}30`;
                  }}
                >
                  {/* Visual Representation */}
                  <div style={{
                    width: '120px',
                    height: '120px',
                    backgroundColor: visualization.backgroundColor,
                    borderRadius: '50%',
                    margin: '0 auto 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '3rem',
                    position: 'relative',
                    border: '4px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: `0 0 30px ${visualization.backgroundColor}50`
                  }}>
                    {visualization.patternIcon}
                    {/* Eyes */}
                    <div style={{
                      position: 'absolute',
                      top: '30%',
                      left: '35%',
                      width: '8px',
                      height: '8px',
                      backgroundColor: visualization.eyeColor,
                      borderRadius: '50%',
                      boxShadow: `0 0 10px ${visualization.eyeColor}`
                    }} />
                    <div style={{
                      position: 'absolute',
                      top: '30%',
                      right: '35%',
                      width: '8px',
                      height: '8px',
                      backgroundColor: visualization.eyeColor,
                      borderRadius: '50%',
                      boxShadow: `0 0 10px ${visualization.eyeColor}`
                    }} />
                  </div>

                  {/* Kitty Info */}
                  <h3 style={{
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    marginBottom: '1rem',
                    color: rarityColor,
                    textAlign: 'center',
                    fontFamily: 'monospace',
                    letterSpacing: '1px',
                    textShadow: `0 0 10px ${rarityColor}`
                  }}>
                    KITTY #{kitty.tokenId}
                  </h3>
                  
                  {/* Genetic Data */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: '1fr 1fr', 
                      gap: '0.5rem',
                      fontSize: '0.9rem',
                      fontFamily: 'monospace'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>GEN:</span>
                        <span style={{ fontWeight: 'bold', color: '#00ff88' }}>{kitty.generation}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>BODY:</span>
                        <span style={{ fontWeight: 'bold', color: visualization.backgroundColor }}>{kitty.bodyColor}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>EYES:</span>
                        <span style={{ fontWeight: 'bold', color: visualization.eyeColor }}>{kitty.eyeColor}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>PATTERN:</span>
                        <span style={{ fontWeight: 'bold', color: '#ffffff' }}>{kitty.pattern}</span>
                      </div>
                    </div>
                  </div>

                  {/* Battle Stats */}
                  <div style={{ 
                    marginBottom: '1.5rem', 
                    padding: '1rem', 
                    background: 'rgba(0, 0, 0, 0.3)', 
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}>
                    <div style={{ 
                      fontSize: '0.8rem', 
                      fontWeight: 'bold', 
                      marginBottom: '0.75rem', 
                      color: '#00ff88',
                      fontFamily: 'monospace',
                      textAlign: 'center'
                    }}>
                      ⚔️ BATTLE STATS
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', fontSize: '0.75rem' }}>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ color: '#ff4444', fontWeight: 'bold' }}>💪 STR</div>
                        <div style={{ color: 'white', fontFamily: 'monospace' }}>{kitty.strength}</div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ color: '#44ff44', fontWeight: 'bold' }}>⚡ AGI</div>
                        <div style={{ color: 'white', fontFamily: 'monospace' }}>{kitty.agility}</div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ color: '#4444ff', fontWeight: 'bold' }}>🧠 INT</div>
                        <div style={{ color: 'white', fontFamily: 'monospace' }}>{kitty.intelligence}</div>
                      </div>
                    </div>
                  </div>

                  {/* Rarity Badge */}
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: rarityColor,
                    color: 'white',
                    padding: '0.3rem 0.8rem',
                    borderRadius: '20px',
                    fontSize: '0.7rem',
                    fontWeight: 'bold',
                    fontFamily: 'monospace',
                    textShadow: '0 0 5px rgba(0, 0, 0, 0.8)',
                    boxShadow: `0 0 15px ${rarityColor}60`
                  }}>
                    {kitty.rarity || 'COMMON'}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div style={{ 
            textAlign: 'center', 
            marginBottom: '3rem',
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={mintKitty}
              disabled={isMinting}
              style={{
                background: 'linear-gradient(45deg, #ff8000, #ff0080)',
                color: 'white',
                padding: '1rem 2.5rem',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                fontFamily: 'monospace',
                letterSpacing: '1px',
                border: '2px solid #00ff88',
                borderRadius: '12px',
                cursor: isMinting ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 0 25px rgba(255, 128, 0, 0.5)',
                textShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
                opacity: isMinting ? 0.7 : 1
              }}
              onMouseEnter={(e) => {
                if (!isMinting) {
                  e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 0 35px rgba(255, 128, 0, 0.8)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isMinting) {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 0 25px rgba(255, 128, 0, 0.5)';
                }
              }}
            >
              {isMinting ? '🔄 MINTING...' : '🎭 MINT NEW KITTY'}
            </button>

            <button
              onClick={forceRefresh}
              disabled={loading}
              style={{
                background: 'linear-gradient(45deg, #0080ff, #00ff88)',
                color: 'white',
                padding: '1rem 2rem',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                fontFamily: 'monospace',
                letterSpacing: '1px',
                border: '2px solid #ff0080',
                borderRadius: '12px',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 0 25px rgba(0, 128, 255, 0.5)',
                textShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
                opacity: loading ? 0.7 : 1
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 0 35px rgba(0, 128, 255, 0.8)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 0 25px rgba(0, 128, 255, 0.5)';
                }
              }}
            >
              {loading ? '🔄 LOADING...' : '🔄 REFRESH COLLECTION'}
            </button>

            <button
              onClick={handleTestContract}
              style={{
                background: 'linear-gradient(45deg, #ff0080, #8000ff)',
                color: 'white',
                padding: '1rem 2rem',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                fontFamily: 'monospace',
                letterSpacing: '1px',
                border: '2px solid #ff8000',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 0 25px rgba(255, 0, 128, 0.5)',
                textShadow: '0 0 10px rgba(255, 255, 255, 0.8)'
              }}
            >
              🧪 TEST CONTRACT
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MyKittiesPage;
