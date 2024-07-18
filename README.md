# 🚀 ERC20Launcher

ERC20Launcher is a comprehensive tool for deploying ERC-20 tokens on any EVM-based blockchain. This project leverages Solidity for smart contract development, Hardhat for the development environment, and Next.js for the frontend interface.

## ✨ Features

- **Easy ERC-20 Token Deployment**: Simplifies the process of deploying customizable ERC-20 tokens.
- **Maximum Supply Customization**: Allows setting a maximum supply for the tokens.
- **Minting and Burning**: Owner-only functions to mint and burn tokens.
- **Custom Decimals**: Supports custom decimal places for token precision.
- **Stop Minting**: Allows the owner to stop minting once the desired supply is reached.
- **Next.js Frontend**: User-friendly interface for interacting with the deployed contracts.
- **Hardhat Integration**: For a robust development, testing, and deployment experience.
- **TypeScript Support**: Ensures type safety and better development practices.
- **Tailwind CSS**: For easy and responsive styling.
- **EVM Compatibility**: Compatible with any EVM-based chain, allowing users to deploy and mint ERC-20 tokens on various blockchains.
- **Network Switching**: UI contains a switch network button where users can add details like RPC, chain ID, name, decimals, token symbol, and blockchain explorer URL to directly switch networks.

## 📝 Smart Contract Details

The `ERC20Launcher.sol` contract includes the following key features:

- **Ownership**: Only the owner can call certain functions.
- **Minting**: Owner can mint new tokens as long as it doesn't exceed the maximum supply.
- **Burning**: Any user can burn their tokens, which decreases the maximum supply.
- **Decimals**: Customizable decimal places for token precision.
- **Stop Minting**: Owner can stop minting permanently by setting the maximum supply to the current total supply.

## 🚀 Getting Started

### 📋 Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)
- [Hardhat](https://hardhat.org/)

### 📦 Installation

1. **Clone the repository** and navigate to the project directory:

   ```bash
   git clone https://github.com/A91y/erc20launcher.git
   cd erc20launcher
   ```

2. **Install dependencies**:

   ```bash
   npm install
   cd app
   npm install
   ```

### ⚙️ Configuration

1. **Copy the example environment file** and configure it:

   ```bash
   cp .env.example .env
   ```

2. **Update the `.env` file** with your specific configuration details such as network settings and private keys.

### 🚀 Deployment

To deploy your ERC-20 token, use Hardhat:

```bash
npx hardhat run scripts/deploy.js --network <network-name>
```

Replace `<network-name>` with the desired network (e.g., `rinkeby`, `mainnet`).

## 🖥️ Usage

After deploying the contract, you can interact with it using the provided frontend interface.

### 🌐 Running the Frontend

Navigate to the `app` directory and start the Next.js development server:

```bash
cd app
npm run dev
```

Access the application at `http://localhost:3000` or visit the live deployment at [ERC20Launcher](https://erc20launcher.ayushagr.me).

## 🛠️ Development

### 🔨 Compiling Contracts

To compile the Solidity contracts, use:

```bash
npx hardhat compile
```

### ✅ Running Tests

To run the tests, use:

```bash
npx hardhat test
```

### ✨ Formatting

Format the code using Prettier:

```bash
npx prettier --write .
```

## 🤝 Contributing

Contributions are welcome! Please fork the repository, create a branch for your feature or bug fix, and submit a pull request.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 📧 Contact

For any inquiries, feel free to contact [me](https://github.com/A91y).

---
