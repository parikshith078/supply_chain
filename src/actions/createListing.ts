"use server";

import { prisma } from "@/db/client";
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

  try {
    const actor = await prisma.actor.create({
      data: {
        name: "parikshith",
        actorType: "FARMER",
        address: "testing with data",
        publicKey: "public keys",
        email: "parikshith@gmail.com",
      },
    });
    console.log(actor);
    const catalog = await prisma.catalog.create({
      data: {
        category: "FRUITS",
        discription: "This is test discription",
        msp: 89.1,
        name: "Bannana",
      },
    });
    const productList = await prisma.product.create({
      data: {
        discrption: "product discription",
        category: "FRUITS",
        dateOfHarvest: new Date(),
        price: 90,
        quantity: 89,
        contractId: "testing",
        ownerId: actor.id,
        catalogId: catalog.id,
        isAvialable: true,
        name: "Test name",
      },
    });

    console.log(productList);
  } catch (err) {
    console.log("Error while creating actor: ", err);
  }
}
