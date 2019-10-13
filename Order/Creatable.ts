import * as isoly from "isoly"
import * as gracely from "gracely"
import { Customer } from "../Customer"
import { Item } from "../Item"
import { Payment } from "../Payment"

export interface Creatable {
	number?: string
	client?: string
	customer?: Customer
	items: number | Item | Item[]
	currency: isoly.Currency
	payment: Payment.Creatable
}

export namespace Creatable {
	export function is(value: Creatable | any): value is Creatable {
		return typeof value == "object" &&
			(typeof value.number == "string" || value.number == undefined) &&
			(typeof value.client == "string" || value.client == undefined) &&
			(value.customer == undefined || Customer.is(value.customer)) &&
			Item.canBe(value.items) &&
			isoly.Currency.is(value.currency) &&
			Payment.Creatable.is(value.payment)
	}
	export function flaw(value: Creatable | any): gracely.Flaw {
		return {
			type: "model.Order.Creatable",
			flaws: typeof value != "object" ? undefined :
				[
					typeof value.number == "string" || value.number == undefined || { property: "number", type: "string | undefined" },
					typeof value.client == "string" || value.client == undefined || { property: "client", type: "string | undefined" },
					value.customer == undefined || Customer.is(value.customer) || Customer.flaw(value.customer),
					Item.canBe(value.items) || { property: "items", type: "number | Item | Item[]" },
					isoly.Currency.is(value.currency) || { property: "currency", type: "Currency" },
					Payment.Creatable.is(value.payment) || { property: "payment", type: "Payment.Creatable" },
				].filter(gracely.Flaw.is) as gracely.Flaw[],
		}
	}
}
