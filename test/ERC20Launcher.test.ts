import { expect } from "chai";
import { ethers } from "hardhat";
import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";

describe("ERC20Launcher", function () {
  async function deployFixture() {
    const [owner, otherAccount] = await ethers.getSigners();

    const ERC20Launcher = await ethers.getContractFactory("ERC20Launcher");
    const erc20Launcher = await ERC20Launcher.deploy(
      "Test Token",    // Name
      "TT",            // Symbol
      ethers.utils.parseUnits("1000000", 18), // Initial supply
      18,              // Decimals
      ethers.constants.MaxUint256              // Max supply
    );
    await erc20Launcher.deployed();

    return { owner, otherAccount, erc20Launcher };
  }

  describe("Deployment", function () {
    it("Should set deployer as owner", async function () {
      const { owner, erc20Launcher } = await loadFixture(deployFixture);
      expect(await erc20Launcher.owner()).to.equal(owner.address);
    });

    // it("Should mint the total supply to owner", async function () {
    //   const { owner, erc20Launcher } = await loadFixture(deployFixture);
    //   const initialSupply = ethers.utils.parseUnits("1000000", 18);
    //   expect(await erc20Launcher.balanceOf(owner.address)).to.equal(initialSupply);
    // });

    // it("Should have correct token metadata", async function () {
    //   const { erc20Launcher } = await loadFixture(deployFixture);
    //   expect(await erc20Launcher.name()).to.equal("Test Token");
    //   expect(await erc20Launcher.symbol()).to.equal("TT");
    //   expect(await erc20Launcher.decimals()).to.equal(18);
    // });
  });

  // describe("Minting", function () {
  //   it("Should allow owner to mint tokens", async function () {
  //     const { owner, otherAccount, erc20Launcher } = await loadFixture(deployFixture);
  //     await erc20Launcher.mint(otherAccount.address, ethers.utils.parseUnits("1000", 18));
  //     expect(await erc20Launcher.balanceOf(otherAccount.address)).to.equal(ethers.utils.parseUnits("1000", 18));
  //   });

  //   it("Should not allow minting beyond max supply", async function () {
  //     const { owner, erc20Launcher } = await loadFixture(deployFixture);
  //     const maxSupply = ethers.constants.MaxUint256;
  //     await expect(erc20Launcher.mint(owner.address, maxSupply))
  //       .to.be.revertedWith("Minting would exceed max supply");
  //   });

  //   it("Should stop minting after max supply is reached", async function () {
  //     const { owner, erc20Launcher } = await loadFixture(deployFixture);
  //     const initialSupply = ethers.utils.parseUnits("1000000", 18);
  //     await erc20Launcher.mint(owner.address, ethers.utils.parseUnits("900000", 18));
  //     expect(await erc20Launcher.totalSupply()).to.equal(initialSupply.add(ethers.utils.parseUnits("900000", 18)));
      
  //     await erc20Launcher.stopMinting();
  //     await expect(erc20Launcher.mint(owner.address, ethers.utils.parseUnits("100000", 18)))
  //       .to.be.revertedWith("Minting Already Stopped!");
  //   });
  // });

  // describe("Transfers", function () {
  //   it("Should transfer tokens between accounts", async function () {
  //     const { owner, otherAccount, erc20Launcher } = await loadFixture(deployFixture);
  //     await erc20Launcher.transfer(otherAccount.address, ethers.utils.parseUnits("1000", 18));
  //     expect(await erc20Launcher.balanceOf(otherAccount.address)).to.equal(ethers.utils.parseUnits("1000", 18));
  //   });

  //   it("Should fail if sender does not have enough balance", async function () {
  //     const { otherAccount, erc20Launcher } = await loadFixture(deployFixture);
  //     await expect(erc20Launcher.connect(otherAccount).transfer(owner.address, ethers.utils.parseUnits("1000", 18)))
  //       .to.be.revertedWith("ERC20: transfer amount exceeds balance");
  //   });

  //   it("Should update balances after transfers", async function () {
  //     const { owner, otherAccount, erc20Launcher } = await loadFixture(deployFixture);
  //     await erc20Launcher.transfer(otherAccount.address, ethers.utils.parseUnits("1000", 18));
  //     expect(await erc20Launcher.balanceOf(otherAccount.address)).to.equal(ethers.utils.parseUnits("1000", 18));
      
  //     await erc20Launcher.connect(otherAccount).transfer(owner.address, ethers.utils.parseUnits("500", 18));
  //     expect(await erc20Launcher.balanceOf(otherAccount.address)).to.equal(ethers.utils.parseUnits("500", 18));
  //     expect(await erc20Launcher.balanceOf(owner.address)).to.equal(ethers.utils.parseUnits("1000000", 18).add(ethers.utils.parseUnits("500", 18)));
  //   });
  // });
});