"use server";
import { adminAuth, createActor } from "@/db/pocketbase";
import { formSchemaType } from "@/lib/formValidation";
import { clerkClient, currentUser } from "@clerk/nextjs";
// import { revalidatePath } from "next/cache";

export async function register(formData: formSchemaType) {
  // console.log(formData);
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
    const res = await createActor(formData, wallet);
    await clerkClient.users.updateUserMetadata(user.id, {
      publicMetadata: {
        registered: true,
        recordId: res,
        actorType: formData.type,
      },
    });
    const getUserMeta = await currentUser();
    console.log(getUserMeta?.publicMetadata);
    console.log("Created actor");
    // revalidatePath('/')
  } catch (err) {
    console.error("Error while creating actor, ", err);
  }
}
