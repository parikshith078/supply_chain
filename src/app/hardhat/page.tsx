"use client";

import { ethers } from "ethers";
// import tracking from "../../../artifacts/contracts/Lock.sol/Lock.json";
import tracking from "../../../artifacts/contracts/Market.sol/Market.json";
import { useEffect } from "react";

// const ContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const ContractAddress = "0xa9742E940B2A71953cE602911E729d1fc61eaa96";
const ContractABI = tracking.abi;

//---FETCHING SMART CONTRACT
const fetchContract = (signerOrProvider: any) =>
  new ethers.Contract(ContractAddress, ContractABI, signerOrProvider);

// async function createProduct(index: string, price: string){
//         const contract = fetchContract(val);
//             const ind = await contract.createProduct(
//               ethers.parseUnits("10", 18),
//               index,
//               {
//                 gasLimit: 400000,
//               }
//             );
//             await ind.wait();
//             console.log("product index should be 1: ", ind);
//
// }
// // function getEth() {
//   const eth = (window as any).ethereum;
//   if (!eth) throw new Error("Get metamask acc");
//
//   return eth;
// }

// struct Transcation {
//   uint pid;
//   address sellerAddress;
//   address buyyerAddress;
//   uint amount;
//   uint timeStamp;
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
        const owner = await contract.totalSells();
        console.log("Testing should be zero: ", owner);
        // await contract.update()
        // const updatedValue = await contract.inputTest();
        // console.log("update should be arr: ", updatedValue);
        // const data = await contract.getDeployedCode()
        // console.log(data)
      });
    }
    test();
  }, []);
  return (
    <div className="flex flex-col gap-10 items-center justify-center my-10">
      <button
        onClick={async () => {
          try {
          } catch (er) {
            console.log("Error while fetching transcations", er);
          }
          const provider = new ethers.BrowserProvider((window as any).ethereum);
          // await provider.send("eth_requestAccounts", []);
          const signer = await provider.getSigner();
          const contract = fetchContract(signer);
          const address = await contract.getAddress();
          console.log("Address: ", address);
          const data = await contract.getAllTranscation();
          const sells = await contract.totalSells();
          console.log("Total sells: ", sells);
          console.log("length: ", data.length);
          const allTranscations = data.map((item: any) => ({
            productId: item.productId,
            seller: item.sellerAddress,
            buyyer: item.buyyerAddress,
            amount: ethers.formatEther(item.amount.toString()),
            timeStamp: item.timeStamp,
          }));
          console.log(allTranscations);
        }}
      >
        get transcations
      </button>

      <button
        onClick={async () => {
          const index = "thisisthefirstetset";
          try {
            const provider = new ethers.BrowserProvider(
              (window as any).ethereum
            );
            // await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            const contract = fetchContract(signer);
            const address = await contract.getAddress();
            console.log("Address: ", address);
            const ind = await contract.createProduct(
              ethers.parseUnits("10", 18),
              index,
              {
                gasLimit: 400000,
              }
            );
            await ind.wait();
            console.log("product index should be 1: ", ind);
          } catch (err) {
            console.log("Error while creating product: ", err);
          }
        }}
      >
        Create product
      </button>
      <button
        onClick={async () => {
          const index = "thisisthefirstetset";
          try {
            const provider = new ethers.BrowserProvider(
              (window as any).ethereum
            );
            // await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            const contract = fetchContract(signer);
            const address = await contract.getAddress();
            console.log("Address: ", address);
            const ind = await contract.getProductInfo(
              index,
              {
                gasLimit: 400000,
              }
            );
            console.log("details: ", ind)
            await ind.wait();
            console.log("product logs : ", ind);
          } catch (err) {
            console.log("Error while creating product: ", err);
          }
        }}
      >
        Get product info
      </button>
      <button
        onClick={async () => {
          try {
            const provider = new ethers.BrowserProvider(
              (window as any).ethereum
            );
            // await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            const contract = fetchContract(signer);
            const address = await contract.getAddress();
            console.log("Address: ", address);
            const trans = await contract.buyProduct(0, new Date().getTime(), {
              value: ethers.parseUnits("10", 18),
            });
            await trans.wait();
            contract.filters.ProductCreated();
            console.log("transcation ", trans);
            console.log("product index should be 1: ");
          } catch (err) {
            console.log("Error while creating product: ", err);
          }
        }}
      >
        Make transcations
      </button>
    </div>
  );
}
