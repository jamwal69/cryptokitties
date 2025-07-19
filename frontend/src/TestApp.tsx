import React from 'react';

const TestApp: React.FC = () => {
  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <h1>🐱 CryptoKitties - Test Mode</h1>
      <p>If you can see this, the basic React setup is working.</p>
      <p>Network: Sepolia Testnet</p>
      <p style={{ color: 'green', fontWeight: 'bold' }}>✅ App is loading successfully!</p>
    </div>
  );
};

export default TestApp;
