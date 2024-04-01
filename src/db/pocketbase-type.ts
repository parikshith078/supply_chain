/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Actor = "actor",
	Consumer = "consumer",
	ConsumerOrder = "consumer_order",
	ListedProduct = "listed_product",
	LotOrder = "lot_order",
	Notification = "notification",
	Product = "product",
	Review = "review",
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
	email?: string
	listed_product?: RecordIdString[]
	location: string
	name: string
	orders?: RecordIdString[]
	public_key: string
	type: ActorTypeOptions
}

export type ConsumerRecord = {
	address?: string
	orders?: RecordIdString[]
	public_key: string
}

export enum ConsumerOrderStatusOptions {
	"pending" = "pending",
	"success" = "success",
}
export type ConsumerOrderRecord = {
	address: string
	amount_paid: number
	consumer: RecordIdString
	date_of_purchase: IsoDateString
	products: RecordIdString[]
	status: ConsumerOrderStatusOptions
}

export type ListedProductRecord = {
	contract_id: string
	data_of_harvest: IsoDateString
	discription: string
	is_aviliable?: boolean
	price: number
	product: RecordIdString
	qr_code: string
	qunatity: number
	reviews?: RecordIdString[]
}

export enum LotOrderStatusOptions {
	"pending" = "pending",
	"success" = "success",
	"rejected" = "rejected",
}
export type LotOrderRecord = {
	amount_paid: number
	buyer: RecordIdString
	date_purchase: IsoDateString
	product: RecordIdString
	quantity: number
	seller: RecordIdString
	status: LotOrderStatusOptions
}

export enum NotificationStatusOptions {
	"pending" = "pending",
	"accepted" = "accepted",
	"rejected" = "rejected",
}
export type NotificationRecord = {
	buyer: RecordIdString
	lot_order: RecordIdString
	seller: RecordIdString
	status: NotificationStatusOptions
}

export enum ProductCategoryOptions {
	"fruits" = "fruits",
	"vegetables" = "vegetables",
	"grains." = "grains.",
}
export type ProductRecord = {
	category: ProductCategoryOptions
	discription: string
	msp: number
	name: string
}

export type ReviewRecord = {
	customer: RecordIdString
	discription?: string
	product: RecordIdString
	rating: number
}

// Response types include system fields and match responses from the PocketBase API
export type ActorResponse<Texpand = unknown> = Required<ActorRecord> & BaseSystemFields<Texpand>
export type ConsumerResponse<Texpand = unknown> = Required<ConsumerRecord> & BaseSystemFields<Texpand>
export type ConsumerOrderResponse<Texpand = unknown> = Required<ConsumerOrderRecord> & BaseSystemFields<Texpand>
export type ListedProductResponse<Texpand = unknown> = Required<ListedProductRecord> & BaseSystemFields<Texpand>
export type LotOrderResponse<Texpand = unknown> = Required<LotOrderRecord> & BaseSystemFields<Texpand>
export type NotificationResponse<Texpand = unknown> = Required<NotificationRecord> & BaseSystemFields<Texpand>
export type ProductResponse<Texpand = unknown> = Required<ProductRecord> & BaseSystemFields<Texpand>
export type ReviewResponse<Texpand = unknown> = Required<ReviewRecord> & BaseSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	actor: ActorRecord
	consumer: ConsumerRecord
	consumer_order: ConsumerOrderRecord
	listed_product: ListedProductRecord
	lot_order: LotOrderRecord
	notification: NotificationRecord
	product: ProductRecord
	review: ReviewRecord
}

export type CollectionResponses = {
	actor: ActorResponse
	consumer: ConsumerResponse
	consumer_order: ConsumerOrderResponse
	listed_product: ListedProductResponse
	lot_order: LotOrderResponse
	notification: NotificationResponse
	product: ProductResponse
	review: ReviewResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'actor'): RecordService<ActorResponse>
	collection(idOrName: 'consumer'): RecordService<ConsumerResponse>
	collection(idOrName: 'consumer_order'): RecordService<ConsumerOrderResponse>
	collection(idOrName: 'listed_product'): RecordService<ListedProductResponse>
	collection(idOrName: 'lot_order'): RecordService<LotOrderResponse>
	collection(idOrName: 'notification'): RecordService<NotificationResponse>
	collection(idOrName: 'product'): RecordService<ProductResponse>
	collection(idOrName: 'review'): RecordService<ReviewResponse>
}
