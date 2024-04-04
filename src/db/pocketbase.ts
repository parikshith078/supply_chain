
import PocketBase, { ListResult } from "pocketbase"
import { Collections, TypedPocketBase, ActorRecord } from "./pocketbase-type";
import { dbEnv } from "./dbTypes";

const env = process.env as unknown as dbEnv

export function testAdd(...numbers: number[]){
	let sum = 0
	for(let i=0; i<numbers.length; i++){
		sum += numbers[i]
	}
	return sum
}

export const db = new PocketBase(env.DB_URL) as TypedPocketBase

export async function getData() {
	const adminData = await db.admins.authWithPassword(env.DB_ADMIN_USERNAME, env.DB_ADMIN_PASSWORD);
	console.log(adminData)
	const data = await db.collection(Collections.Actor).getList()
	// const result = await db.collection("consumer").getList<ConsumerRecord>() 
	// return result
}


