"use server";
import { getOwnerDetails } from "@/actions/getData";
import { faker } from "@faker-js/faker";
type TranscationType = {
  pid: string;
  seller: string;
  buyyer: string;
  amount: string;
  timeStamp: number;
};

// TODO: Delet this
export async function getFakeData() {
  const data: TranscationType[] = [];
  const pid: string[] = [];

  for (let i = 0; i < 5; i++) {
    const id = faker.finance.accountNumber();
    pid.push(id);
  }

  for (let i = 0; i < 10; i++) {
    const tmp = {
      pid: pid[i % 5],
      seller: faker.finance.bitcoinAddress(),
      buyyer: faker.finance.bitcoinAddress(),
      amount: faker.finance.bitcoinAddress(),
      timeStamp: faker.date
        .birthdate({ min: 1, max: 2, mode: "age" })
        .getTime(),
    };
    data.push(tmp);
  }
  return data;
}

export async function getProductTrackingById(
  pid: string,
  transcations: TranscationType[]
) {
  const sortedData = sortDataByPid(transcations);
  const productTranscations = sortedData[pid];
  const trackingData: {
    address: string;
    publicKey: string;
    actoryType: string;
  }[] = [];
  //TODO: Add dummy data
  productTranscations.map(async (item) => {
    const selleraddress = await getOwnerDetails(item.seller);
    if (!selleraddress.ok) {
      console.error("Error while fetching seller address");
      return;
    }
    trackingData.push({
      address: selleraddress.address ?? "No data",
      publicKey: selleraddress.publicKey ?? "No data",
      actoryType: selleraddress.actoryType ?? "No data",
    });
  });
}

function sortDataByPid(data: TranscationType[]): {
  [key: string]: TranscationType[];
} {
  let sortedData: { [key: string]: TranscationType[] } = {};
  data.forEach((entry) => {
    const pid = entry.pid;
    if (!(pid in sortedData)) {
      sortedData[pid] = [];
    }
    sortedData[pid].push(entry);
  });
  sortedData = sortDataByTimeStamp(sortedData);
  return sortedData;
}
function sortDataByTimeStamp(data: Record<string, TranscationType[]>) {
  for (const key in data) {
    data[key].sort((a, b) => a.timeStamp - b.timeStamp);
  }
  return data;
}
