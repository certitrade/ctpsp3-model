import * as isoly from "isoly"
import * as authly from "authly"
import * as card from "@cardfunc/model"
import { CreatableBase } from "../CreatableBase"

export interface Creatable extends CreatableBase {
	type: "card"
	account?: string
	reference?: authly.Token
	amount?: number
}

export namespace Creatable {
	export function is(value: any | Creatable): value is Creatable {
		return typeof value == "object" &&
			value.type == "card" &&
			(
				typeof value.account == "string" && value.reference == undefined && (typeof value.amount == "number" && isoly.Currency.is(value.currency) || value.amount == undefined && value.currency == undefined) ||
				value.account == undefined && value.amount == undefined && value.currency == undefined && authly.Token.is(value.reference)
			) &&
			CreatableBase.is(value)
	}
	export async function from(authorization: authly.Token): Promise<Creatable | undefined> {
		const values = await card.Authorization.verify(authorization)
		return values && {
			type: "card",
			reference: authorization,
			amount: values.amount,
			currency: values.currency,
		}
	}
}
