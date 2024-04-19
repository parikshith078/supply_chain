"use server";

import { adminAuth, createProductListing } from "@/db/pocketbase";
import { ProductRecord } from "@/db/pocketbase-type";
import { createProductFromSchemaType } from "@/lib/formValidation";
import { currentUser } from "@clerk/nextjs";

export async function createProductAction(
  formData: any,
  date: Date,
  url: string,
) {
  console.log("Working on createing product...");
  console.log(formData);
  console.log(formData.get("image"));
  console.log(date.toISOString());
  console.log(url);
  // console.log(formData.get("name"));
  const user = await currentUser();
  if (!user) {
    console.log("User is not authenticated");
    return;
  }
  const userRecordId = user.publicMetadata.recordId;
  console.log(userRecordId);
  const tesRecord: ProductRecord = {
    product: "vetwf66sp3l2k22",
    data_of_harvest: "2022-01-01 10:00:00.123Z",
    discription: "test",
    qunatity: 123,
    is_aviliable: true,
    price: 123,
    contract_id: "test",
    qr_code: "https://example.com",
    owner: "6adqv8xs1d837ac",
    image: "https://example.com",
  };
  const record: ProductRecord = {
    contract_id: "testing",
    data_of_harvest: date.toISOString(),
    discription: formData.get("discription"),
    image: url,
    owner: userRecordId as string,
    price: formData.get("price"),
    is_aviliable: true,
    product: formData.get("productId"),
    qr_code: "https://farm-to-fork.vercel.app",
    qunatity: formData.get("stock"),
  };

  try {
    await adminAuth();
    console.log("Creating listing...");
    const res = await createProductListing(tesRecord);
    return res;
  } catch (err) {
    console.error("Error while create product lising: ", err);
  }
}
