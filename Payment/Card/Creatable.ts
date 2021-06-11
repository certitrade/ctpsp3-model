import * as gracely from "gracely"
import * as isoly from "isoly"
import * as authly from "authly"
import { Browser } from "@payfunc/model-base"
import { CreatableBase } from "../CreatableBase"
export interface Creatable extends CreatableBase {
	type: "card"
	card?: authly.Token
	reference?: authly.Token
	amount?: number
	client?: { ip?: string; browser?: Browser | Browser.Creatable }
	verification?: { type: "pares" | "method" | "challenge"; data?: string | { [property: string]: any } }
	schedule?: true
}

export namespace Creatable {
	export function is(value: any | Creatable): value is Creatable {
		return (
			typeof value == "object" &&
			value.type == "card" &&
			((authly.Token.is(value.card) &&
				value.reference == undefined &&
				((value.amount == undefined && value.currency == undefined) ||
					(typeof value.amount == "number" && isoly.Currency.is(value.currency)))) ||
				(value.card == undefined &&
					authly.Token.is(value.reference) &&
					value.amount == undefined &&
					value.currency == undefined)) &&
			(value.verification == undefined ||
				(typeof value.verification == "object" &&
					(value.verification.type == "pares" ||
						value.verification.type == "method" ||
						value.verification.type == "challenge") &&
					(value.verification.data == undefined ||
						typeof value.verification.data == "string" ||
						typeof value.verification.data == "object"))) &&
			(value.client == undefined ||
				(typeof value.client == "object" &&
					(value.client.ip == undefined || typeof value.client.ip == "string") &&
					(value.client.browser == undefined ||
						Browser.is(value.client.browser) ||
						Browser.Creatable.is(value.client.browser)))) &&
			(value.schedule == undefined || value.schedule == true) &&
			CreatableBase.is(value)
		)
	}
	export function flaw(value: any | Creatable): gracely.Flaw {
		return {
			type: "model.Payment.Card.Creatable",
			flaws:
				typeof value != "object"
					? undefined
					: ([
							value.type == "card" || { property: "type", type: '"card"' },
							authly.Token.is(value.card) ||
								value.card == undefined || { property: "card", type: "authly.Token | undefined" },
							authly.Token.is(value.reference) ||
								value.reference == undefined || { property: "reference", type: "authly.Token | undefined" },
							typeof value.amount == "number" ||
								value.amount == undefined || { property: "amount", type: "number | undefined" },
							value.schedule == true ||
								value.schedule == undefined || { property: "schedule", type: "true | undefined" },
							CreatableBase.is(value) || { ...CreatableBase.flaw(value).flaws },
					  ].filter(gracely.Flaw.is) as gracely.Flaw[]),
		}
	}
	export async function from(authorization: authly.Token): Promise<Creatable | undefined> {
		return {
			type: "card",
			reference: authorization,
		}
	}
}
