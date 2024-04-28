"use server";
import { prisma } from "@/db/client";
import { registrationFormSchemaType } from "@/lib/formValidation";
import { clerkClient, currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

export async function register(formData: registrationFormSchemaType) {
  // TODO: Server side error handling and communicate to the client
  console.log("Registering user");
  const user = await currentUser();
  if (!user) {
    console.log("User is not authenticated");
    return;
  }
  try {
    const wallet = user.web3Wallets[0].web3Wallet;
    console.log("wallets: ", user.web3Wallets);
    console.log(wallet);
    const actor = await prisma.actor.create({
      data: {
        actorType: formData.type,
        name: formData.name,
        address: formData.address,
        publicKey: wallet,
        email: formData.email,
      },
    });
    console.log(actor);
    await clerkClient.users.updateUserMetadata(user.id, {
      publicMetadata: {
        registered: true,
        recordId: actor?.id,
        actorType: formData.type,
      },
    });
    revalidatePath("/");
  } catch (err) {
    console.error("Error while creating actor, ", err);
  }

  return { success: true };
}

export async function getCatalogProductById(id: string) {
  try {
    const data = await prisma.catalog.findUnique({
      where: {
        id: id,
      },
    });
    return data;
  } catch (err) {
    console.error("Error while getting data");
    return null;
  }
}

export async function deRegister(userId: string) {
  try {
    await prisma.actor.delete({
      where: {
        id: userId,
      },
    });
    const user = await currentUser();
    clerkClient.users.deleteUser(user!.id);
  } catch (err) {
    console.error("Error while deleting user: ", err);
  }
}

export async function deleteProductbyId(pid: string) {
  await prisma.product.delete({
    where: {
      id: pid,
    },
  });
}
