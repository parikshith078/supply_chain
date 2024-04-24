"use server";

import { prisma } from "@/db/client";
import { currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

export async function createProductAction(
  formData: { price: string; stock: string; discription: string },
  date: Date,
  others: { category: string; catelogId: string; name: string }
) {
  console.log("Working on createing product...");
  const user = await currentUser();
  if (!user) {
    console.log("User is not authenticated");
    return { success: false };
  }
  const userRecordId = user.publicMetadata.recordId;
  const userType = user.publicMetadata.actorType;
  if (userType != "FARMER") {
    console.log("Not authorised to create product");
    return { success: false };
  }
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
    return { success: true, id: productList.id };
  } catch (err) {
    console.log("Error while creating actor: ", err);
  }
}

export async function changeOwnershipToCurrentUser(productId: string) {
  const user = await currentUser();
  const userRecordId = user?.publicMetadata.recordId as string;
  try {
    await prisma.product.update({
      where: { id: productId },
      data: {
        ownerId: userRecordId,
      },
    });
    revalidatePath("/inventory");
  } catch (err) {
    console.log("Error while changing ownership: ", err);
  }
}

export async function deleteAllProducts() {
  await prisma.product
    .deleteMany()
    .then(() => console.log("Deleted all products"));
}
export async function deleteAllUsers() {
  await prisma.product
    .deleteMany()
    .then(() => console.log("Deleted all user"));
}
