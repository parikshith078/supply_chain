"use server";

import { prisma } from "@/db/client";
import { currentUser } from "@clerk/nextjs";
import { faker } from "@faker-js/faker";

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

  // TODO: do form validation

  try {
    // TODO: add contract id to product register
    const productList = await prisma.product.create({
      data: {
        discrption: formData.get("discription"),
        category: formData.get("category"),
        dateOfHarvest: date,
        price: parseFloat(formData.get("price")),
        quantity: parseInt(formData.get("stock")),
        contractId: faker.string.uuid(),
        ownerId: userRecordId as string,
        catalogId: formData.get("productId"),
        isAvialable: false,
        name: formData.get("name"),
        imageUrl: url,
      },
    });

    console.log(productList);
  } catch (err) {
    console.log("Error while creating actor: ", err);
  }
}
