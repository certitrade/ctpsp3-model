import * as isoly from "isoly"
import * as gracely from "gracely"
import * as authly from "authly"
import { Customer } from "../Customer"
import { Item } from "../Item"
import { Payment } from "../Payment"

export interface Creatable {
	id?: authly.Identifier
	number?: string
	client?: string
	customer?: Customer
	items: number | Item | Item[]
	currency: isoly.Currency
	payment: Payment.Creatable
	theme?: string
	meta?: any
	callback?: string
	language?: isoly.Language
}

export namespace Creatable {
	export function is(value: Creatable | any): value is Creatable {
		return typeof value == "object" &&
			(authly.Identifier.is(value.id, 16) || value.id == undefined) &&
			(typeof value.number == "string" || value.number == undefined) &&
			(typeof value.client == "string" || value.client == undefined) &&
			(value.customer == undefined || Customer.is(value.customer)) &&
			Item.canBe(value.items) &&
			isoly.Currency.is(value.currency) &&
			Payment.Creatable.is(value.payment) &&
			(typeof value.theme == "string" || value.theme == undefined) &&
			(typeof value.callback == "string" || value.callback == undefined) &&
			(isoly.Language.is(value.language) || value.language == undefined)
	}
	export function flaw(value: Creatable | any): gracely.Flaw {
		return {
			type: "model.Order.Creatable",
			flaws: typeof value != "object" ? undefined :
				[
					authly.Identifier.is(value.id, 16) || value.id == undefined || { property: "id", type: "authly.Identifier | undefined", condition: "length == 16" },
					typeof value.number == "string" || value.number == undefined || { property: "number", type: "string | undefined" },
					typeof value.client == "string" || value.client == undefined || { property: "client", type: "string | undefined" },
					value.customer == undefined || Customer.is(value.customer) || Customer.flaw(value.customer),
					Item.canBe(value.items) || { property: "items", type: "number | Item | Item[]" },
					isoly.Currency.is(value.currency) || { property: "currency", type: "Currency" },
					Payment.Creatable.is(value.payment) || { property: "payment", type: "Payment.Creatable" },
					typeof value.theme == "string" || value.theme == undefined || { property: "theme", type: "string | undefined" },
					typeof value.callback == "string" || value.callback == undefined || { property: "callback", type: "string | undefined" },
					isoly.Language.is(value.language) || value.language == undefined || { property: "language", type: "isoly.Language | undefined" },
				].filter(gracely.Flaw.is) as gracely.Flaw[],
		}
	}
}
