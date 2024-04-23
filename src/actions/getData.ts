"use server";
import { prisma } from "@/db/client";

export async function getAllProducts() {
  const data = prisma.product
    .findMany()
    .catch((err) =>
      console.error("Error while getching catalog products...", err)
    );
  return data;
}
