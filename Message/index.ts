import * as isoly from "isoly"
import * as authly from "authly"
import { Key } from "../Key"
import { Order } from "../Order"
import { Type as MessageType } from "./Type"
export interface Message {
	type: MessageType
	order: Order
	merchant: Pick<Key, "name" | "language" | "logotype" | "id" | "url" | "terms">
}

export namespace Message {
	export function is(value: any | Message): value is Message {
		return (
			typeof value == "object" &&
			MessageType.is(value.type) &&
			Order.is(value.order) &&
			typeof value.merchant == "object" &&
			typeof value.merchant.name == "string" &&
			(value.merchant.language == undefined || isoly.Language.is(value.merchant.language)) &&
			(value.merchant.logotype == undefined || typeof value.merchant.logotype == "string") &&
			(value.merchant.id == undefined || authly.Identifier.is(value.merchant.id == "string")) &&
			(value.merchant.url == undefined || typeof value.merchant.url == "string") &&
			(value.merchant.terms == undefined || typeof value.merchant.terms == "string")
		)
	}
	export type Type = MessageType
	export namespace Type {
		export const is = MessageType.is
		export const types = MessageType.types
	}
}
