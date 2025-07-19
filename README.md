# 🐱 CryptoKitties - Advanced Blockchain NFT Game

<div align="center">

![CryptoKitties Logo](https://img.shields.io/badge/CryptoKitties-NFT%20Game-purple?style=for-the-badge&logo=ethereum)
![Solidity](https://img.shields.io/badge/Solidity-0.8.20-blue?style=for-the-badge&logo=solidity)
![React](https://img.shields.io/badge/React-18.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Polygon](https://img.shields.io/badge/Polygon-Sepolia-purple?style=for-the-badge&logo=polygon)

**A complete blockchain-based NFT breeding game with advanced genetic algorithms, marketplace functionality, and battle system.**

[🚀 Live Demo](#live-demo) | [📖 Documentation](#documentation) | [🎮 Try Now](#getting-started)

</div>

## � **Project Highlights**

This project demonstrates **advanced blockchain development skills** and implements a complete NFT ecosystem with:

- **🧬 Genetic Algorithm**: Advanced breeding system with 45%/45%/10% trait inheritance
- **⚔️ Battle System**: Turn-based combat with stat-based mechanics  
- **🏪 Marketplace**: Auction system with bidding and fixed-price sales
- **💰 Staking**: Rarity-based reward system with compound interest
- **🎨 Modern UI**: Cyberpunk-themed responsive interface
- **🔒 Security**: OpenZeppelin patterns with comprehensive testing

## � **Key Features**

### Smart Contracts (Solidity)
- **CryptoKitties.sol**: Main NFT contract with genetic breeding
- **KittyMarketplace.sol**: Decentralized trading platform
- **KittyBattle.sol**: Combat system with tournaments
- **KittyStaking.sol**: Yield farming with rarity multipliers
- **KittyToken.sol**: ERC-20 utility token for ecosystem

### Frontend (React + TypeScript)
- **Web3 Integration**: Ethers.js v6 with MetaMask support
- **Genetic Visualization**: Dynamic kitty rendering based on traits
- **Real-time Updates**: Live marketplace and battle feeds
- **Responsive Design**: Mobile-first with Tailwind CSS
- **State Management**: React Context with TypeScript
- **KittyBattle.sol**: Combat system with experience and tournaments
- **KittyStaking.sol**: Staking mechanism with rarity-based rewards

### Frontend
- **React 18** with TypeScript for type safety
- **Tailwind CSS** for responsive design
- **Ethers.js** for blockchain interactions
- **React Router** for navigation

## 🧬 Genetic Algorithm Features

### Core Inheritance System
- **45%** traits from parent 1
- **45%** traits from parent 2
- **10%** random mutations
- **12 unique traits**: speed, strength, intelligence, luck, agility, cuteness, pattern, eyeColor, bodyColor, accent, background, generation

### Rarity System
- Common (60%), Uncommon (25%), Rare (10%), Epic (4%), Legendary (1%)
- Battle stats derived from genetic traits
- Visual representation based on trait combinations

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- MetaMask wallet
- Polygon Mumbai testnet setup

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd "Crypto Kitties"

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Add your PRIVATE_KEY and POLYGON_MUMBAI_RPC_URL
```

### Environment Setup

Create `.env` file with:
```
PRIVATE_KEY=your_wallet_private_key
POLYGON_MUMBAI_RPC_URL=https://rpc-mumbai.maticvigil.com/
POLYGONSCAN_API_KEY=your_polygonscan_api_key
```

### Deployment

```bash
# Compile contracts
npm run compile

# Run tests
npm run test

# Deploy to Mumbai testnet
npm run deploy:mumbai

# Verify contracts on PolygonScan
npm run verify

# Mint initial Gen 0 kitties
npm run mint
```

### Run Frontend

```bash
# Start development server
npm run frontend:start

# Access at http://localhost:3000
```

## 🎮 Game Features

### 🧬 Breeding System
- Combine two parent kitties to create unique offspring
- Advanced genetic algorithm ensures trait inheritance
- Cooldown periods prevent spam breeding
- Generation tracking for lineage

### 🏪 Marketplace
- **Fixed Price Sales**: List kitties for immediate purchase
- **Auction System**: Competitive bidding with time limits
- **Breeding Offers**: Request breeding services from other players
- **Price History**: Track market trends and valuations

### ⚔️ Battle Arena
- **Turn-based Combat**: Strategic battles using kitty stats
- **Experience System**: Level up through victories
- **Tournaments**: Compete in organized competitions
- **Leaderboards**: Showcase top battlers

### 💰 Staking Platform
- **Passive Income**: Earn KittyTokens by staking
- **Rarity Multipliers**: Higher rewards for rare kitties
- **Flexible Terms**: Multiple staking duration options
- **Compound Interest**: Maximize returns over time

## 📊 Smart Contract Details

### CryptoKitties Contract
```solidity
// Core breeding function
function breedKitties(uint256 parent1Id, uint256 parent2Id) external {
    // Validates ownership and breeding eligibility
    // Applies genetic algorithm for trait inheritance
    // Mints new offspring with unique traits
}
```

### Battle System
```solidity
// Battle mechanics with critical hits and dodging
function executeBattleAction(uint256 attackerId, uint256 defenderId, uint8 action) external {
    // Calculates damage based on genetic stats
    // Applies critical hit and dodge chances
    // Awards experience and KittyTokens
}
```

### Staking Rewards
```solidity
// Rarity-based reward calculation
function calculateRewards(uint256 kittyId) public view returns (uint256) {
    // Time-based reward accumulation
    // Rarity multiplier application
    // Compound interest calculation
}
```

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run specific test files
npx hardhat test test/CryptoKitties.test.ts
npx hardhat test test/KittyMarketplace.test.ts
npx hardhat test test/KittyBattle.test.ts
```

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run compile` | Compile smart contracts |
| `npm run test` | Run contract tests |
| `npm run deploy:mumbai` | Deploy to Mumbai testnet |
| `npm run verify` | Verify contracts on PolygonScan |
| `npm run mint` | Mint Gen 0 kitties |
| `npm run frontend:start` | Start React development server |
| `npm run frontend:build` | Build production frontend |

## 🌐 Network Configuration

### Polygon Mumbai Testnet
- **Network Name**: Polygon Mumbai
- **RPC URL**: https://rpc-mumbai.maticvigil.com/
- **Chain ID**: 80001
- **Symbol**: MATIC
- **Explorer**: https://mumbai.polygonscan.com/

### Get Test MATIC
- **Polygon Faucet**: https://faucet.polygon.technology/
- **Alchemy Faucet**: https://mumbaifaucet.com/

## 📁 Project Structure

```
Crypto Kitties/
├── contracts/              # Smart contracts
│   ├── CryptoKitties.sol
│   ├── KittyToken.sol
│   ├── KittyMarketplace.sol
│   ├── KittyBattle.sol
│   └── KittyStaking.sol
├── scripts/                # Deployment scripts
│   ├── deploy.ts
│   └── mint.ts
├── test/                   # Contract tests
├── frontend/               # React application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── utils/
│   └── public/
├── hardhat.config.ts       # Hardhat configuration
└── package.json           # Dependencies and scripts
```

## 🔐 Security Features

- **OpenZeppelin Contracts**: Industry-standard security patterns
- **Access Controls**: Role-based permissions for critical functions
- **Reentrancy Guards**: Protection against reentrancy attacks
- **Input Validation**: Comprehensive parameter checking
- **Gas Optimizations**: Efficient storage and computation patterns

## 🎨 Frontend Features

### Web3 Integration
- MetaMask connection and wallet management
- Real-time blockchain state updates
- Transaction monitoring and notifications
- Network switching and error handling

### User Interface
- Responsive design for mobile and desktop
- Interactive kitty visualization
- Real-time marketplace updates
- Battle animations and effects

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenZeppelin for secure smart contract libraries
- Hardhat for development framework
- Polygon for scalable blockchain infrastructure
- React and Tailwind communities for frontend tools

## 📞 Support

If you encounter any issues or have questions:
1. Check the troubleshooting section
2. Review existing GitHub issues
3. Create a new issue with detailed information
4. Join our community discussions

---

**Made with ❤️ for blockchain education and the future of decentralized gaming**
