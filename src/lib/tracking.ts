"use server";
import { getOwnerDetailsByPublicKey, getOwnerDetailsById } from "@/actions/getData";
import { faker } from "@faker-js/faker";
export type TranscationTypeSC = {
  productId: string;
  seller: string;
  buyyer: string;
  amount: string;
  timeStamp: number;
};

export default async function getProductTrackingById(
  pid: string,
  transcations: TranscationTypeSC[]
) {
  const sortedData = sortDataByPid(transcations);
  const productTranscations = sortedData[pid];
  if (!productTranscations || productTranscations.length == 0) {
    // TODO: handel this case
    console.log("No trascation found");
    return [];
  }
  const trackingData: {
    address: string;
    publicKey: string;
    actoryType: string;
    time: Date
  }[] = [];
  productTranscations.map(async (item) => {
    const selleraddress = await getOwnerDetailsByPublicKey(item.seller);
    if (!selleraddress.ok) {
      console.error("Error while fetching seller address");
      return null;
    }
    trackingData.push({
      address: selleraddress.address!,
      publicKey: selleraddress.publicKey!,
      actoryType: selleraddress.actoryType!,
      time: new Date(item.timeStamp)
    });
  });
  return trackingData;
}

function sortDataByPid(data: TranscationTypeSC[]): {
  [key: string]: TranscationTypeSC[];
} {
  let sortedData: { [key: string]: TranscationTypeSC[] } = {};
  data.forEach((entry) => {
    const pid = entry.productId;
    if (!(pid in sortedData)) {
      sortedData[pid] = [];
    }
    sortedData[pid].push(entry);
  });
  sortedData = sortDataByTimeStamp(sortedData);
  return sortedData;
}
function sortDataByTimeStamp(data: Record<string, TranscationTypeSC[]>) {
  for (const key in data) {
    data[key].sort((a, b) => a.timeStamp - b.timeStamp);
  }
  return data;
}
