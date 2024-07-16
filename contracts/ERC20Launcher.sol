// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20Launcher is ERC20 {
    address public owner;
    uint8 private decimal;
    uint256 public maxSupply;

    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply,
        uint8 _decimals,
        uint256 _maxSupply // includes the decimals
    ) ERC20(name, symbol) {
        require(
            _maxSupply >= initialSupply * 10 ** _decimals,
            "Max supply must be greater than or equal to initial supply"
        );
        decimal = _decimals;
        _mint(msg.sender, initialSupply * 10 ** decimal);
        owner = msg.sender;
        maxSupply = _maxSupply; // MAX VALUE = 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff OR 115792089237316195423570985008687907853269984665640564039457584007913129639935
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    function mint(address account, uint256 amount) external onlyOwner {
        require(
            totalSupply() + (amount * 10 ** decimals()) <= maxSupply,
            "Minting would exceed max supply"
        );
        _mint(account, amount * 10 ** decimals());
    }

    function transfer(
        address recipient,
        uint256 amount
    ) public virtual override returns (bool) {
        _transfer(_msgSender(), recipient, amount);
        return true;
    }

    function approve(
        address spender,
        uint256 amount
    ) public virtual override returns (bool) {
        _approve(_msgSender(), spender, amount);
        return true;
    }

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) public virtual override returns (bool) {
        _transfer(sender, recipient, amount);
        _approve(
            sender,
            _msgSender(),
            allowance(sender, _msgSender()) - amount
        );
        return true;
    }

    function balanceOf(
        address account
    ) public view virtual override returns (uint256) {
        return super.balanceOf(account);
    }

    function allowance(
        address _owner,
        address spender
    ) public view virtual override returns (uint256) {
        return super.allowance(_owner, spender);
    }

    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
        maxSupply -= amount;
    }

    function decimals() public view virtual override returns (uint8) {
        return decimal;
    }

    function stopMinting() external onlyOwner {
        require(maxSupply > totalSupply(), "Minting Already Stopped!");
        maxSupply = totalSupply();
    }
}
