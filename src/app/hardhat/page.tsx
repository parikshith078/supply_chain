"use client";

import { ethers } from "ethers";
// import tracking from "../../../artifacts/contracts/Lock.sol/Lock.json";
import tracking from "../../../artifacts/contracts/Test.sol/Test.json";
import { useEffect } from "react";

// const ContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const ContractAddress = "0xa9742E940B2A71953cE602911E729d1fc61eaa96";
const ContractABI = tracking.abi;

//---FETCHING SMART CONTRACT
const fetchContract = (signerOrProvider: any) =>
  new ethers.Contract(ContractAddress, ContractABI, signerOrProvider);

// function getEth() {
//   const eth = (window as any).ethereum;
//   if (!eth) throw new Error("Get metamask acc");
//
//   return eth;
// }

export default function Page() {
  useEffect(() => {
    async function test() {
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      // await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      signer.then(async (val) => {
        console.log(val.provider);
        const contract = fetchContract(val);
        const address = await contract.getAddress();
        console.log(address);
        const owner = await contract.testing();
        console.log("Testing: ", owner);
        // await contract.update()
        const updatedValue = await contract.inputTest();
        console.log("update should be arr: ", updatedValue);
        // const data = await contract.getDeployedCode()
        // console.log(data)
      });
    }
    test();
  }, []);
  return (
    <div>
      <h1>Connecting hardhat...</h1>
      <button
        className="bg-black"
        onClick={async () => {
          const provider = new ethers.BrowserProvider((window as any).ethereum);
          // await provider.send("eth_requestAccounts", []);
          const signer = await provider.getSigner();
          const contract = fetchContract(signer);
          const address = await contract.getAddress();
          console.log("Address: ", address);
          await contract.update();
          const updatedValue = await contract.inputTest();
          console.log("update should be arr: ", updatedValue);
          // const data = await contract.getDeployedCode()
          // console.log(data)
        }}
      >
        Click
      </button>
    </div>
  );
}
