import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Web3Provider } from './context/Web3Context-full';
import Home from './pages/Home-simple';
import MyKitties from './pages/MyKitties-simple';
import Marketplace from './pages/Marketplace';
import Battle from './pages/Battle';
import Staking from './pages/Staking';

const App: React.FC = () => {
  return (
    <Web3Provider>
      <Router>
        <div style={{ 
          minHeight: '100vh',
          backgroundColor: '#ffffff',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
        }}>
          {/* Navigation Header */}
          <nav style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '1rem 2rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            marginBottom: '2rem'
          }}>
            <div style={{
              maxWidth: '1200px',
              margin: '0 auto',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              {/* Logo */}
              <Link to="/" style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: 'white',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                🐱 CryptoKitties
              </Link>

              {/* Navigation Links */}
              <div style={{
                display: 'flex',
                gap: '1rem',
                alignItems: 'center'
              }}>
                <Link to="/" style={{
                  color: 'white',
                  textDecoration: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '25px',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  fontWeight: '500'
                }}>
                  🏠 Home
                </Link>
                <Link to="/my-kitties" style={{
                  color: 'white',
                  textDecoration: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '25px',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  fontWeight: '500'
                }}>
                  😺 My Kitties
                </Link>
                <Link to="/marketplace" style={{
                  color: 'white',
                  textDecoration: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '25px',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  fontWeight: '500'
                }}>
                  🛒 Marketplace
                </Link>
                <Link to="/battle" style={{
                  color: 'white',
                  textDecoration: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '25px',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  fontWeight: '500'
                }}>
                  ⚔️ Battle
                </Link>
                <Link to="/staking" style={{
                  color: 'white',
                  textDecoration: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '25px',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  fontWeight: '500'
                }}>
                  💎 Staking
                </Link>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main style={{ 
            padding: '0 2rem',
            minHeight: 'calc(100vh - 200px)',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/my-kitties" element={<MyKitties />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/battle" element={<Battle />} />
              <Route path="/staking" element={<Staking />} />
            </Routes>
          </main>

          {/* Footer */}
          <footer style={{
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            padding: '2rem',
            textAlign: 'center',
            color: '#333',
            marginTop: '3rem',
            borderTop: '1px solid #e0e0e0'
          }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <p style={{ 
                margin: 0, 
                fontSize: '1.1rem',
                fontWeight: '600',
                color: '#667eea'
              }}>
                🚀 Welcome to the Future of Digital Cats 🚀
              </p>
              <p style={{ 
                margin: '0.5rem 0 0 0', 
                fontSize: '0.9rem',
                color: '#666'
              }}>
                Powered by Sepolia Testnet | Advanced Genetic Algorithms | Web3 Gaming
              </p>
            </div>
          </footer>
        </div>
      </Router>
    </Web3Provider>
  );
};

export default App;
