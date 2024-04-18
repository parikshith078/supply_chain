import PocketBase from "pocketbase";
import {
  Collections,
  TypedPocketBase,
  ActorRecord,
  ProductRecord,
} from "./pocketbase-type";
import { dbEnv } from "./dbTypes";
import { registrationFormSchemaType } from "@/lib/formValidation";

const env = process.env as unknown as dbEnv;

const db = new PocketBase(env.DB_URL) as TypedPocketBase;

//TODO: Export a enum with aall functions
//TODO: Deal with adminAuth 

export async function adminAuth() {
  await db.admins.authWithPassword(
    env.DB_ADMIN_USERNAME,
    env.DB_ADMIN_PASSWORD,
  );
  console.log("authenticated as admin");
}

export async function createProductListing(record: ProductRecord) {
  console.log("Listing...");
  try {
    const res = await db.collection(Collections.Product).create(record);
    return res.id;
  } catch (err) {
    console.error("Error while create product", err);
  }
}

export async function getAllCatalogProducts() {
  try {
    console.log("Geting list...");
    const res = await db.collection(Collections.ProductCatalog).getList();
    return res;
  } catch (err) {
    console.error("Error while geting catelog products", err);
  }
}

export async function getCatalogProductById(id: string) {
  try {
    console.log("Geting product by id...");
    const res = await db.collection(Collections.ProductCatalog).getOne(id);
    return res;
  } catch (err) {
    console.error("Error while geting catelog product by id", err);
  }
}

export async function createActor(
  data: registrationFormSchemaType,
  wallet: string,
) {
  const record: ActorRecord = {
    address: data.address,
    email: data.email,
    name: data.name,
    public_key: wallet,
    type: data.type as any,
  };
  try {
    // INFO:returns user object on create
    const res = await db.collection(Collections.Actor).create(record);
    console.log("Actor created ", res);
    return res.id;
  } catch (error) {
    console.error("Error while create actor: ", error);
  }
}
async function fetchProfileInfo(publicKey: string) {
  try {
    const res = await db
      .collection(Collections.Actor)
      .getFirstListItem(`public_key="${publicKey}"`);
    console.log("Receved user info: ", res);
    return res;
  } catch (error) {
    console.error("Error while fetching data: ", error);
  }
}
async function updateProfileInfo(currentUserId: string, data: ActorRecord) {
  try {
    const res = await db
      .collection(Collections.Actor)
      .update(currentUserId, data);
    console.log("Updated profile info");
    return res;
  } catch (error) {
    console.error(error);
  }
}
