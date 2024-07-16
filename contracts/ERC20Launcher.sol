// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20Launcher is ERC20 {
    address public owner;
    bool public futureMintingEnabled;
    uint8 private decimal;

    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply,
        uint8 _decimals,
        bool _futureMintingEnabled
    ) ERC20(name, symbol) {
        decimal = _decimals;
        _mint(msg.sender, initialSupply * 10 ** decimal);
        owner = msg.sender;
        futureMintingEnabled = _futureMintingEnabled;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    function mint(address account, uint256 amount) external onlyOwner {
        require(futureMintingEnabled, "Can't mint more tokens");
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
    }

    function decimals() public view override virtual returns (uint8) {
        return decimal;
    }

    function stopMinting() external onlyOwner {
        require(futureMintingEnabled, "Minting Already Stopped!");
        futureMintingEnabled = false;
    }
}
