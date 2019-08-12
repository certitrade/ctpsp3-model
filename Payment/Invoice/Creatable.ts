import * as gracely from "gracely"
import { Customer } from "../../Customer"
import { Item } from "../../Item"
import { Terms } from "./Terms"
import { CreatableBase } from "../CreatableBase"

export interface Creatable extends CreatableBase {
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
			Item.canBe(value.items) &&
			CreatableBase.is(value)
	}
	export function flaw(value: any | Creatable): gracely.Flaw {
		return {
			type: "model.Payment.Invoice.Creatable",
			flaws: typeof(value) != "object" ? undefined :
				[
					value.type == "invoice" || { property: "type", type: '"invoice"' },
					Terms.is(value.terms) || { property: "terms", ...Terms.flaw(value.terms) },
					Customer.is(value.customer) || { property: "customer", ...Customer.flaw(value.customer) },
					Item.canBe(value.items) || { property: "items", type: "number | Item | Item[]" },
					CreatableBase.is(value) || { ...CreatableBase.flaw(value).flaws },
				].filter(gracely.Flaw.is),
		}
	}
}
