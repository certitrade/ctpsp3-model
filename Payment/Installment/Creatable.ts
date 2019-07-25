import * as isoly from "isoly"
import { Customer } from "../../Customer"
import { Item } from "../../Item"
import { Plan } from "./Plan"

export interface Creatable {
	type: "installment"
	number?: string
	customer: Customer
	items: number | Item | Item[]
	currency: isoly.Currency
	plan: Plan
}

export namespace Creatable {
	export function is(value: any | Creatable): value is Creatable {
		return typeof(value) == "object" &&
			value.type == "installment" &&
			(value.number == undefined || typeof(value.number) == "string") &&
			Plan.is(value.plan) &&
			Customer.is(value.customer) &&
			Item.canBe(value.item) &&
			isoly.Currency.is(value.currency)
	}
}
