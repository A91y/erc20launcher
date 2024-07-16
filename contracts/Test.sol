// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Test {
    address public owner;

    constructor() {
        owner = msg.sender;
    }
}
