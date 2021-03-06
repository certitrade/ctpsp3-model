import * as gracely from "gracely"
import * as authly from "authly"
import { CreatableBase } from "../CreatableBase"

export interface Creatable extends CreatableBase {
	type: "customer"
	token?: authly.Token // @deprecated
	customer?: authly.Identifier // @deprecated
	schedule?: number[]
	charge?: "auto" | "balance"
	scheduled?: true
}

export namespace Creatable {
	export function is(value: any | Creatable): value is Creatable {
		return (
			typeof value == "object" &&
			value.type == "customer" &&
			(authly.Token.is(value.token) || value.token == undefined) &&
			(value.customer == undefined || authly.Identifier.is(value.customer, 16)) &&
			(value.schedule == undefined ||
				(Array.isArray(value.schedule) && value.schedule.every((v: number) => typeof v == "number"))) &&
			(value.charge == undefined || value.charge == "auto" || value.charge == "balance") &&
			(value.scheduled == undefined || value.scheduled == true) &&
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
							value.type == "customer" || { property: "type", type: '"customer"' },
							authly.Token.is(value.token) ||
								authly.Identifier.is(value.customer, 16) || {
									property: "token",
									type: "authly.Token",
									condition: "either token or customer should be set",
								},
							authly.Identifier.is(value.customer, 16) ||
								authly.Token.is(value.token) || {
									property: "customer",
									type: "authly.Identifier | undefined",
									condition: "customer.length == 16 and either token or customer should be set",
								},
							value.charge == undefined ||
								value.charge == "auto" ||
								value.charge == "balance" || {
									property: "charge",
									type: '"auto" | "balance" | undefined',
								},
							value.schedule == undefined ||
								(Array.isArray(value.schedule) && value.schedule.every((v: number) => typeof v == "number")) || {
									property: "schedule",
									type: '"number[]" | undefined',
								},
							value.scheduled == undefined ||
								value.scheduled == true || {
									property: "scheduled",
									type: '"true" | undefined',
								},
							CreatableBase.is(value) || { ...CreatableBase.flaw(value).flaws },
					  ].filter(gracely.Flaw.is) as gracely.Flaw[]),
		}
	}
}
