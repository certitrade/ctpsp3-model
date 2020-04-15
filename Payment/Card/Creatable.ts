import * as isoly from "isoly"
import * as gracely from "gracely"
import * as authly from "authly"
import { CreatableBase } from "../CreatableBase"

export interface Creatable extends CreatableBase {
	type: "card"
	account?: string
	card?: authly.Token
	reference?: authly.Token
	amount?: number
}

export namespace Creatable {
	export function is(value: any | Creatable): value is Creatable {
		return typeof value == "object" &&
			value.type == "card" &&
			(
				(typeof value.account == "string" && value.card == undefined && value.reference == undefined || value.account == undefined && authly.Token.is(value.card) && value.reference == undefined) &&
				(typeof value.amount == "number" && isoly.Currency.is(value.currency) || value.amount == undefined && value.currency == undefined) ||
				value.account == undefined && value.amount == undefined && value.currency == undefined && authly.Token.is(value.reference)
			) &&
			CreatableBase.is(value)
	}
	export function flaw(value: any | Creatable): gracely.Flaw {
		return {
			type: "model.Payment.Card.Creatable",
			flaws: typeof value != "object" ? undefined :
				[
					value.type == "card" || { property: "type", type: '"card"' },
					typeof value.account == "string" || value.account == undefined || { property: "account", type: "string | undefined" },
					authly.Token.is(value.card) || value.card == undefined || { property: "card", type: "authly.Token | undefined" },
					authly.Token.is(value.reference) || value.reference == undefined || { property: "reference", type: "authly.Token | undefined" },
					typeof value.amount == "number" || value.amount == undefined || { property: "amount", type: "number | undefined" },
					CreatableBase.is(value) || { ...CreatableBase.flaw(value).flaws },
				].filter(gracely.Flaw.is) as gracely.Flaw[],
		}
	}
	export async function from(authorization: authly.Token): Promise<Creatable | undefined> {
		return {
			type: "card",
			reference: authorization,
		}
	}
}
