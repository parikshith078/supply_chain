"use server";

import { createProductFromSchemaType } from "@/lib/formValidation";

export async function createProductAction(
  formData: any,
) {
  console.log("Working on createing product...");
  console.log(formData);
  // const user = await currentUser();
  // if (!user) {
  //   console.log("User is not authenticated");
  //   return;
  // }
  // const userRecordId = user.publicMetadata.recordId;
  // console.log(userRecordId);
  // const record: ProductRecord = {
  //   contract_id: "testing",
  //   data_of_harvest: formData.dateOfHarvest.toISOString(),
  //   discription: formData.description,
  //   image: fileUrl,
  //   owner: userRecordId as any,
  //   price: formData.price,
  //   product: catelogProductId,
  //   qr_code: "https://farm-to-fork.vercel.app",
  //   qunatity: formData.quantity,
  // };
  //
  // try {
  //   await adminAuth();
  //   console.log("Creating listing...");
  //   const res = await createProductListing(record);
  //   return res;
  // } catch (err) {
  //   console.error("Error while create product lising: ", err);
  // }
}
