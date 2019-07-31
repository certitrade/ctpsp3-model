import * as isoly from "isoly"
import * as authly from "authly"
import { Item } from "../../Item"
import { Method } from "./Method"

export interface Creatable {
	type: "defer"
	client: authly.Identifier
	number?: string
	method: Method
	contact: string
	message?: string
	items: number | Item | Item[]
	currency: isoly.Currency
}

export namespace Creatable {
	export function is(value: any | Creatable): value is Creatable {
		return typeof(value) == "object" &&
			value.type == "defer" &&
			(value.number == undefined || typeof(value.number) == "string") &&
			Method.is(value.method) &&
			typeof(value.contact) == "string" &&
			(value.message == undefined || typeof(value.message) == "string") &&
			Item.canBe(value.items) &&
			isoly.Currency.is(value.currency)
	}
}
