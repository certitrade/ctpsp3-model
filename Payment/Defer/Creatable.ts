import * as isoly from "isoly"
import { Item } from "../../Item"
import { Method } from "./Method"

export interface Creatable {
	type: "defer"
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
			Method.is(value.plan) &&
			typeof(value.contact) == "string" &&
			(value.message == undefined || typeof(value.message) == "string") &&
			Item.canBe(value.item) &&
			isoly.Currency.is(value.currency)
	}
}
