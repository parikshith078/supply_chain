"use server";
import { adminAuth, createActor, createProductListing } from "@/db/pocketbase";
import { ProductRecord } from "@/db/pocketbase-type";
import {
  createProductFromSchemaType,
  registrationFormSchemaType,
} from "@/lib/formValidation";
import { clerkClient, currentUser } from "@clerk/nextjs";

export async function register(formData: registrationFormSchemaType) {
  // TODO: Server side error handling and communicate to the client
  const user = await currentUser();
  if (!user) {
    console.log("User is not authenticated");
    return;
  }
  try {
    const wallet = user.web3Wallets[0].web3Wallet;
    console.log(wallet);
    await adminAuth();
    console.log("Auth as admin");
    const res = await createActor(formData, wallet);
    await clerkClient.users.updateUserMetadata(user.id, {
      publicMetadata: {
        registered: true,
        recordId: res,
        actorType: formData.type,
      },
    });
  } catch (err) {
    console.error("Error while creating actor, ", err);
  }
}

