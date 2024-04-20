"use server";
import { prisma } from "@/db/client";
import {
  registrationFormSchemaType,
} from "@/lib/formValidation";
import { clerkClient, currentUser } from "@clerk/nextjs";

export async function register(formData: registrationFormSchemaType) {
  // TODO: Server side error handling and communicate to the client
  console.log("Registering user")
  const user = await currentUser();
  if (!user) {
    console.log("User is not authenticated");
    return;
  }
  try {
    const wallet = user.web3Wallets[0].web3Wallet;
    console.log(wallet);
    const actor = await prisma.actor.create({
      data: {
        actorType: formData.type,
        name: formData.name,
        address: formData.address,
        publicKey: wallet,
        email: formData.email
      }
    }).catch(err => console.error("Error while createing actor: ", err))
    await clerkClient.users.updateUserMetadata(user.id, {
      publicMetadata: {
        registered: true,
        recordId: actor?.id,
        actorType: formData.type,
      },
    }).catch(err => console.error("Error while post user metadata: ", err));
  } catch (err) {
    console.error("Error while creating actor, ", err);
  }
}

