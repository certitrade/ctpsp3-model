import * as isoly from "isoly"
import { Customer } from "../../Customer"
import { Item } from "../../Item"
import { Terms } from "./Terms"

export interface Creatable {
	type: "invoice"
	number?: string
	terms: Terms
	customer: Customer
	items: number | Item | Item[]
	currency: isoly.Currency
}

export namespace Creatable {
	export function is(value: any | Creatable) {
		return typeof(value) == "object" &&
			value.type == "invoice" &&
			(value.number == undefined || typeof(value.number) == "string") &&
			Terms.is(value.terms) &&
			Customer.is(value.customer) &&
			Item.canBe(value.item) &&
			isoly.Currency.is(value.currency)
	}
}
