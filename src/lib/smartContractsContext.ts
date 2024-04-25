import { ethers } from "ethers";
import market from "../../artifacts/contracts/Market.sol/Market.json";
import { changeOwnershipToCurrentUser } from "@/actions/createListing";
import { TranscationTypeSC } from "@/lib/tracking";
const ContractAddress = "0xa9742E940B2A71953cE602911E729d1fc61eaa96";
const ContractABI = market.abi;

//---FETCHING SMART CONTRACT
const fetchContract = (signerOrProvider: any) =>
  new ethers.Contract(ContractAddress, ContractABI, signerOrProvider);

export async function createProductSC(index: string, price: string) {
  console.log("starting creating");
  try {
    const provider = new ethers.BrowserProvider((window as any).ethereum);
    const signer = await provider.getSigner();
    const contract = fetchContract(signer);
    const address = await contract.getAddress();
    console.log("Address: ", address);
    const sells = await contract.totalSells();
    console.log("sells: ", sells);
    const logs = await contract.createProduct(
      ethers.parseUnits(price, 18),
      index
    );
    await logs.wait();
    console.log("Logs: ", logs);
  } catch (err) {
    console.log("Error while creating product: ", err);
  }
}
export async function getTotalSellsSC() {
  try {
    const provider = new ethers.BrowserProvider((window as any).ethereum);
    const signer = await provider.getSigner();
    const contract = fetchContract(signer);
    const address = await contract.getAddress();
    console.log("Address: ", address);
    const sells = await contract.totalSells();
    console.log("details: ", sells);
    return sells.toString() as string;
  } catch (err) {
    console.log("Error while creating product: ", err);
  }
}

export async function getProductInfoSC(index: string) {
  try {
    const provider = new ethers.BrowserProvider((window as any).ethereum);
    const signer = await provider.getSigner();
    const contract = fetchContract(signer);
    const address = await contract.getAddress();
    console.log("Address: ", address);
    const ind = await contract.getProductInfo(index, {
      gasLimit: 400000,
    });
    console.log("details: ", ind);
  } catch (err) {
    console.log("Error while creating product: ", err);
  }
}
export async function getAllTranscationsSC() {
  try {
    const provider = new ethers.BrowserProvider((window as any).ethereum);
    const signer = await provider.getSigner();
    const contract = fetchContract(signer);
    const address = await contract.getAddress();
    console.log("Address: ", address);
    const ind = await contract.getAllTranscation();
    console.log("details: ", ind);
    const allTranscations = ind.map((item: any) => ({
      productId: item.productId,
      seller: item.sellerAddress,
      buyyer: item.buyyerAddress,
      amount: ethers.formatEther(item.amount.toString()),
      timeStamp: Number(item.timeStamp),
    }));
    return allTranscations as TranscationTypeSC[];
  } catch (err) {
    console.log("Error while fetching trascations product: ", err);
  }
}

export function formatDateTime(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  };
  return date.toLocaleString("en-US", options);
}
export async function buyProductSC(
  index: string,
  timeStamp: number,
  price: string
) {
  try {
    const provider = new ethers.BrowserProvider((window as any).ethereum);
    const signer = await provider.getSigner();
    const contract = fetchContract(signer);
    const address = await contract.getAddress();
    console.log("Address: ", address);
    const logs = await contract
      .buyProduct(index, timeStamp, {
        value: ethers.parseUnits(price, 18),
      })
      .then(async () => {
        await changeOwnershipToCurrentUser(index);
      });
    console.log("details: ", logs);
  } catch (err) {
    console.log("Error while purchasing product: ", err);
  }
}
