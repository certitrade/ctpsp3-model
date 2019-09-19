import * as isoly from "isoly"
import * as authly from "authly"
import * as gracely from "gracely"
import { Type } from "./Type"

export interface CreatableBase {
	type: Type
	client?: authly.Identifier
	number?: string
	currency: isoly.Currency
	descriptor?: string
}

export namespace CreatableBase {
	export function is(value: any | CreatableBase): value is CreatableBase {
		return typeof value == "object" &&
			Type.is(value.type) &&
			(value.client == undefined || authly.Identifier.is(value.client)) &&
			(value.number == undefined || typeof value.number == "string") &&
			isoly.Currency.is(value.currency) &&
			(value.descriptor == undefined || typeof value.descriptor == "string")
	}
	export function flaw(value: any | CreatableBase): gracely.Flaw {
		return {
			type: "model.Payment.CreatableBase",
			flaws: typeof value != "object" ? undefined :
				[
					Type.is(value.type) || { property: "type", type: "Type" },
					value.client == undefined || authly.Identifier.is(value.client) || { property: "client", type: "authly.Identifier | undefined" },
					value.number == undefined || typeof value.number == "string" || { property: "number", type: "string | undefined" },
					isoly.Currency.is(value.currency) || { property: "currency", type: "isoly.Currency" },
					value.descriptor == undefined || typeof value.descriptor == "string" || { property: "descriptor", type: "string | undefined" },
				].filter(gracely.Flaw.is) as gracely.Flaw[],
		}
	}
}
