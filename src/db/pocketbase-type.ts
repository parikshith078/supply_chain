/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Actor = "actor",
	Notification = "notification",
	Order = "order",
	Product = "product",
	ProductCatalog = "product_catalog",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export enum ActorTypeOptions {
	"farmer" = "farmer",
	"processor" = "processor",
	"distributor" = "distributor",
	"retailer" = "retailer",
}
export type ActorRecord = {
	address: string
	email?: string
	listed_product?: RecordIdString[]
	name: string
	orders?: RecordIdString[]
	public_key: string
	type: ActorTypeOptions
}

export enum NotificationStatusOptions {
	"pending" = "pending",
	"accepted" = "accepted",
	"rejected" = "rejected",
}
export type NotificationRecord = {
	buyer: RecordIdString
	order: RecordIdString
	seller: RecordIdString
	status: NotificationStatusOptions
}

export enum OrderStatusOptions {
	"pending" = "pending",
	"success" = "success",
	"rejected" = "rejected",
}
export type OrderRecord = {
	amount_paid: number
	buyer: RecordIdString
	date_purchase: IsoDateString
	product: RecordIdString
	quantity: number
	seller: RecordIdString
	status: OrderStatusOptions
}

export type ProductRecord = {
	contract_id: string
	data_of_harvest: IsoDateString
	discription: string
	image: string
	is_aviliable?: boolean
	owner: RecordIdString
	price: number
	product: RecordIdString
	qr_code: string
	qunatity: number
}

export enum ProductCatalogCategoryOptions {
	"fruits" = "fruits",
	"vegetables" = "vegetables",
	"grains." = "grains.",
}
export type ProductCatalogRecord = {
	category: ProductCatalogCategoryOptions
	discription: string
	msp: number
	name: string
}

// Response types include system fields and match responses from the PocketBase API
export type ActorResponse<Texpand = unknown> = Required<ActorRecord> & BaseSystemFields<Texpand>
export type NotificationResponse<Texpand = unknown> = Required<NotificationRecord> & BaseSystemFields<Texpand>
export type OrderResponse<Texpand = unknown> = Required<OrderRecord> & BaseSystemFields<Texpand>
export type ProductResponse<Texpand = unknown> = Required<ProductRecord> & BaseSystemFields<Texpand>
export type ProductCatalogResponse<Texpand = unknown> = Required<ProductCatalogRecord> & BaseSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	actor: ActorRecord
	notification: NotificationRecord
	order: OrderRecord
	product: ProductRecord
	product_catalog: ProductCatalogRecord
}

export type CollectionResponses = {
	actor: ActorResponse
	notification: NotificationResponse
	order: OrderResponse
	product: ProductResponse
	product_catalog: ProductCatalogResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'actor'): RecordService<ActorResponse>
	collection(idOrName: 'notification'): RecordService<NotificationResponse>
	collection(idOrName: 'order'): RecordService<OrderResponse>
	collection(idOrName: 'product'): RecordService<ProductResponse>
	collection(idOrName: 'product_catalog'): RecordService<ProductCatalogResponse>
}
