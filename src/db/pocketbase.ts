
import PocketBase, { ListResult } from "pocketbase"
import { ConsumerRecord, dbEnv } from "./dbTypes";

const env = process.env as unknown as dbEnv


export const db = new PocketBase(env.DB_URL)

export async function getData() {
	const adminData = await db.admins.authWithPassword(env.DB_ADMIN_USERNAME, env.DB_ADMIN_PASSWORD);
	console.log(adminData)
	const result = await db.collection("consumer").getList<ConsumerRecord>() 
	return result
}


