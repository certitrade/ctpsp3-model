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
				typeof value.account == "string" && typeof value.amount == "number" && value.reference == undefined ||
				value.account == undefined && value.amount == undefined && authly.Token.is(value.reference)
			) &&
			CreatableBase.is(value)
	}
	export function from(authorization: authly.Token): Creatable | undefined {
		const values = card.Authorization.verify(authorization)
		return values && {
			type: "card",
			reference: authorization,
			amount: values.amount || 0,
			currency: values.currency || "EUR",
		}
	}
}
