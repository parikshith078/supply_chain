"use server";

import { prisma } from "@/db/client";
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

  // TODO: do form validation

  try {
    const catalog = await prisma.catalog
      .findUnique({
        where: {
          id: formData.get("productId"),
        },
      })
      .catch((err) => console.log("Error while fetching category: ", err));
    // TODO: add contract id to product register
    const productList = await prisma.product.create({
      data: {
        discrption: formData.get("discription"),
        category: catalog!.category,
        dateOfHarvest: date,
        price: parseFloat(formData.get("price")),
        quantity: parseInt(formData.get("stock")),
        contractId: "testing",
        ownerId: userRecordId as string,
        catalogId: catalog!.id,
        isAvialable: false,
        name: catalog!.name,
        imageUrl: url,
      },
    });

    console.log(productList);
  } catch (err) {
    console.log("Error while creating actor: ", err);
  }
}

