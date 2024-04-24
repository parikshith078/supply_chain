"use server";
import { prisma } from "@/db/client";
import { ActorType } from "@/lib/generalTypes";
import { currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

export async function getMarketProducts() {
  const user = await currentUser();
  const userType = user?.publicMetadata.actorType as ActorType;
  let marketType = ActorType.FARMER;

  switch (userType) {
    case ActorType.RETAILER:
      marketType = ActorType.DISTRIBUTOR;
      break;
    case ActorType.DISTRIBUTOR:
      marketType = ActorType.PROCESSOR;
      break;
    case ActorType.PROCESSOR:
      marketType = ActorType.FARMER;
      break;
    default:
      marketType = ActorType.FARMER;
  }

  const data = prisma.product.findMany({
    where: {
      AND: [
        {
          owner: {
            actorType: marketType,
          },
        },
        {
          isAvialable: true,
        },
      ],
    },
  });
  return data;
}

export async function toggleInventory(productId: string, currentStat: boolean) {
  try {
    await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        isAvialable: !currentStat,
      },
    });
    revalidatePath("/inventory");
  } catch (err) {
    console.error("Error while toggling ", err);
  }
}
