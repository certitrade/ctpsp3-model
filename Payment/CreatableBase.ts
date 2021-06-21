import * as gracely from "gracely"
import * as isoly from "isoly"
import { Type } from "./Type"

export interface CreatableBase {
	type: Type
	currency?: isoly.Currency
	descriptor?: string
	category?: "purchase" | "withdrawal"
}

export namespace CreatableBase {
	export function is(value: any | CreatableBase): value is CreatableBase {
		return (
			typeof value == "object" &&
			Type.is(value.type) &&
			(value.currency == undefined || isoly.Currency.is(value.currency)) &&
			(value.descriptor == undefined || typeof value.descriptor == "string")
		)
	}
	export function flaw(value: any | CreatableBase): gracely.Flaw {
		return {
			type: "model.Payment.CreatableBase",
			flaws:
				typeof value != "object"
					? undefined
					: ([
							Type.is(value.type) || { property: "type", type: "Type" },
							value.currency == undefined ||
								isoly.Currency.is(value.currency) || { property: "currency", type: "isoly.Currency | undefined" },
							value.descriptor == undefined ||
								typeof value.descriptor == "string" || { property: "descriptor", type: "string | undefined" },
					  ].filter(gracely.Flaw.is) as gracely.Flaw[]),
		}
	}
}
