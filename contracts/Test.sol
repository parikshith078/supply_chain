// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Test {
  uint8 public testing;
  uint8[] public data = [5, 2, 3];
  constructor() {
    testing = 10;
  }

  function update() external {
    data.push(10);
  }

  function inputTest() public view returns(uint8[] memory){
    return data;
  }
}
