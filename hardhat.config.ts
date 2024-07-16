import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

import "dotenv/config";

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    hardhat: {
      gas: 2000000, // Set the gas limit for the Hardhat network
    },
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      chainId: 11155111,
      accounts: [`0x${process.env.SEPOLIA_PRIVATE_KEY}`],
    },
    polygonamoy: {
      url: `https://polygon-amoy.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      chainId: 80002,
      accounts: [`0x${process.env.POLYGON_PRIVATE_KEY}`],
    },
  },
};

export default config;
