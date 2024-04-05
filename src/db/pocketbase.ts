import PocketBase  from "pocketbase";
import {
  Collections,
  TypedPocketBase,
  ActorRecord,
  ActorTypeOptions,
} from "./pocketbase-type";
import { dbEnv } from "./dbTypes";

const env = process.env as unknown as dbEnv;

const db = new PocketBase(env.DB_URL) as TypedPocketBase;
const dummyData: ActorRecord[] = [
  {
    email: "john@example.com",
    location: "California",
    name: "John Doe",
    public_key: "abcde12345",
    type: ActorTypeOptions.farmer,
  },
  {
    email: "jane@example.com",
    location: "New York",
    name: "Jane Smith",
    public_key: "fghij67890",
    type: ActorTypeOptions.processor,
  },
    {
    email: "bob@example.com",
    location: "Texas",
    name: "Bob Johnson",
    public_key: "qwert54321",
    type: ActorTypeOptions.farmer,
  },
  {
    email: "emily@example.com",
    location: "Florida",
    name: "Emily Brown",
    public_key: "zxcvb98765",
    type: ActorTypeOptions.retailer,
  }
];

//TODO: Export a enum with aall functions


export async function adminAuth() {
  const adminData = await db.admins.authWithPassword(
    env.DB_ADMIN_USERNAME,
    env.DB_ADMIN_PASSWORD,
  );
  console.log("authenticated as admin");
  console.log(adminData);
  // const res = await fetchProfileInfo("abcde12345") as unknown as ActorResponse<unknown>;
  // await updateProfileInfo("g25qkv7x29tynwj", dummyData[3])
  // await createActor(dummyData[1])
}


async function createActor(data: ActorRecord) {
  try {
    // INFO:returns user object on create
    const res = await db.collection(Collections.Actor).create(data);
    console.log("Actor created ", res);
    return res
  } catch (error) {
    console.error("Error while create actor: ", error);
  }
}
async function fetchProfileInfo(publicKey: string) {
  try {
    const res = await db.collection(Collections.Actor).getFirstListItem(`public_key="${publicKey}"`)
    console.log("Receved user info: ", res);
    return res
  } catch (error) {
    console.error("Error while fetching data: ", error);
  }
}
async function updateProfileInfo(currentUserId: string, data: ActorRecord) {
  try {
    const res = await db.collection(Collections.Actor).update(currentUserId, data)
    console.log("Updated profile info")
    return res
  } catch(error) {
    console.error(error)
  }
}
