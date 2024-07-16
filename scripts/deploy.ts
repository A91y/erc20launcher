import { ethers } from "hardhat";

async function main() {
  const name = "AyushToken"; // Token name
  const symbol = "ATK"; // Token symbol
  const initialSupply = ethers.utils.parseUnits("1000000", 18); // Initial supply (e.g., 1,000,000 tokens with 18 decimals)
  const decimals = 18; // Number of decimals
  const maxSupply = ethers.constants.MaxUint256; // Maximum supply (uint256 maximum value)

  // Deploying the ERC20Launcher contract
  const ERC20Launcher = await ethers.getContractFactory("ERC20Launcher");
  const erc20Launcher = await ERC20Launcher.deploy(
    name,
    symbol,
    initialSupply,
    decimals,
    maxSupply
  );

  await erc20Launcher.deployed();

  console.log(`ERC20Launcher deployed to: ${erc20Launcher.address}`);
  // Sepolia: 0x7A626E602408a6638bBA1A13816C3c1674e51858
  // Polygon Amoy: 0xA126F38E22e5c82BfD4846969041296dd4C157c0
}

// Running the main function and handling errors
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
