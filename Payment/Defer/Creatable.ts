import * as isoly from "isoly"
import { Customer } from "../../Customer"
import { Item } from "../../Item"
import { Method } from "./Method"

export interface Creatable {
	type: "defer"
	number?: string
	method: Method
	items: number | Item | Item[]
	currency: isoly.Currency
}

export namespace Creatable {
	export function is(value: any | Creatable) {
		return typeof(value) == "object" &&
			value.type == "defer" &&
			(value.number == undefined || typeof(value.number) == "string") &&
			Customer.is(value.customer) &&
			Item.canBe(value.item) &&
			isoly.Currency.is(value.currency) &&
			Method.is(value.plan)
	}
}
