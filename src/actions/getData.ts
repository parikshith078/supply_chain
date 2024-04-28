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

export async function getProductDetailsById(productId: string) {
  try {
    const data = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });
    return data;
  } catch (err) {
    console.error("Error while toggling ", err);
  }
}

export async function getNumberUsers() {
  try {
    const count = await prisma.actor.count();
    return { ok: true, count };
  } catch (e) {
    console.error("Error while fetching user data :", e);
    return { ok: false };
  }
}

export async function getOwnerDetailsByPublicKey(publicKey: string) {
  console.log("Got seller id in getowner: ", publicKey.trim());
  try {
    const data = await prisma.actor.findFirst({
      where: {
        publicKey: {
          contains: publicKey.trim(),
        },
      },
    });
    console.log("owner data: ", data);
    return {
      ok: true,
      address: data?.address,
      publicKey: data?.publicKey,
      actoryType: data?.actorType,
    };
  } catch (e) {
    console.error("Error while fetching product data :", e);
    return { ok: false };
  }
}

export async function upDateProductData(
  id: string,
  data: { discription: string; price: string }
) {
  try {
    console.log("owner data: ", data);
    const res = await prisma.product.update({
      where: {
        id: id,
      },
      data: {
        discrption: data.discription,
        price: parseFloat(data.price),
      },
    });
    revalidatePath("/inventory");
    console.log("Price: ", res.price, "dis: ", res.discrption);
    return {
      ok: true,
    };
  } catch (e) {
    console.error("Error while updating product info :", e);
    return { ok: false };
  }
}
export async function getOwnerDetailsById(id: string) {
  console.log("Got seller id in getowner: ", id.trim());
  try {
    const data = await prisma.actor.findFirst({
      where: {
        id: id,
      },
    });
    console.log("owner data: ", data);
    return {
      ok: true,
      data,
    };
  } catch (e) {
    console.error("Error while fetching owner data :", e);
    return { ok: false };
  }
}
