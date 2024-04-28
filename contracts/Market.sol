// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;
import "hardhat/console.sol";

contract Market {
  struct Transcation {
    string productId;
    address sellerAddress;
    address buyyerAddress;
    uint amount;
    uint timeStamp;
  }

  address public owner;

  event ProductCreated(string indexed productId, address owner);
  event TranscationMade(
    string indexed productId,
    address indexed owner,
    address indexed seller,
    uint price,
    uint timeStamp
  );

  struct Product {
    address payable owner;
    uint price;
  }

  Transcation[] transcations;
  mapping(string => Product) products;

  uint public totalSells;

  constructor() {
    totalSells = 0;
    owner = msg.sender;
  }

  function createProduct(uint price, string memory productId) external {
    Product memory product = Product(payable(msg.sender), price);
    products[productId] = product;
    emit ProductCreated(productId, msg.sender);
  }

  function buyProduct(string memory pid, uint timeStamp) external payable {
    console.log("Entering buy function", pid);
    console.log("Entering buy timeStamp: ", timeStamp);
    Product storage curr = products[pid];

    require(msg.value >= curr.price, "Pay more ether...");
    address payable lastOwner = curr.owner;
    bool success = lastOwner.send(msg.value);
    require(success, "Transfer failed");

    curr.owner = payable(msg.sender);

    totalSells += msg.value;
    Transcation memory newTranscation = Transcation(
      pid,
      lastOwner,
      msg.sender,
      msg.value,
      timeStamp
    );
    transcations.push(newTranscation);

    emit TranscationMade(
      pid,
      msg.sender,
      lastOwner,
      msg.value,
      timeStamp
    );
  }
  function getAllTranscation() external view returns (Transcation[] memory) {
    return transcations;
  }

  function getProductInfo(string memory productId) external view returns (Product memory) {
    return products[productId];
  }
}
