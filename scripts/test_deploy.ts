import { ethers } from "hardhat";

async function main() {
  // Deploying the ERC20Launcher contract
  const Test = await ethers.getContractFactory("Test");
  const test = await Test.deploy();

  await test.deployed();

  console.log(`Test deployed to: ${test.address}`);
}

// Running the main function and handling errors
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
