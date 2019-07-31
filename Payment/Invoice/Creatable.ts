import * as isoly from "isoly"
import { Customer } from "../../Customer"
import { Item } from "../../Item"
import { Terms } from "./Terms"
import { CreatableBase } from "../CreatableBase"

export interface Creatable {
	type: "invoice"
	terms: Terms
	customer: Customer
	items: number | Item | Item[]
}

export namespace Creatable {
	export function is(value: any | Creatable): value is Creatable {
		return typeof(value) == "object" &&
			value.type == "invoice" &&
			Terms.is(value.terms) &&
			Customer.is(value.customer) &&
			Item.canBe(value.item) &&
			CreatableBase.is(value)
	}
}
