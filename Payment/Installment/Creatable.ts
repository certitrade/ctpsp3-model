import { Customer } from "../../Customer"
import { Item } from "../../Item"
import { Plan } from "./Plan"
import { CreatableBase } from "../CreatableBase"

export interface Creatable extends CreatableBase {
	type: "installment"
	customer: Customer
	items: number | Item | Item[]
	plan: Plan
}

export namespace Creatable {
	export function is(value: any | Creatable): value is Creatable {
		return typeof(value) == "object" &&
			value.type == "installment" &&
			Plan.is(value.plan) &&
			Customer.is(value.customer) &&
			Item.canBe(value.items) &&
			CreatableBase.is(value)
	}
}
