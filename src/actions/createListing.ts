"use server";

import { prisma } from "@/db/client";
import { currentUser } from "@clerk/nextjs";

export async function createProductAction(
  formData: { price: string; stock: string; discription: string },
  date: Date,
  others: { category: string, catelogId: string, name: string }
) {
  console.log("Working on createing product...");
  console.log(formData);
  console.log(others)
  console.log(date.toISOString());
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
        discrption: formData.discription,
        category: others.category,
        dateOfHarvest: date,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.stock),
        ownerId: userRecordId as string,
        catalogId: others.catelogId,
        isAvialable: false,
        name: others.name,
        imageUrl: "parikshithpalegar",
      },
    });

    console.log(productList);
  } catch (err) {
    console.log("Error while creating actor: ", err);
  }
}
