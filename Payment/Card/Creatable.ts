import * as isoly from "isoly"
import * as authly from "authly"

export interface Creatable {
	type: "card"
	number?: string
	account: string | authly.Token
	amount: number
	currency: isoly.Currency
}

export namespace Creatable {
	export function is(value: any | Creatable): value is Creatable {
		return typeof(value) == "object" &&
			value.type == "card" &&
			(value.number == undefined || typeof(value.number) == "string") &&
			(typeof(value.account) == "string" || authly.Token.is(value.account)) &&
			typeof(value.amount) &&
			isoly.Currency.is(value.currency)
	}
}
