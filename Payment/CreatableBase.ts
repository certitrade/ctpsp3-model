import * as isoly from "isoly"
import * as authly from "authly"
import { Type } from "./Type"

export interface CreatableBase {
	type: Type
	client?: authly.Identifier
	number?: string
	currency: isoly.Currency
}

export namespace CreatableBase {
	export function is(value: any | CreatableBase): value is CreatableBase {
		return typeof(value) == "object" &&
			Type.is(value.type) &&
			(value.client == undefined || authly.Identifier.is(value.client)) &&
			(value.number == undefined || typeof(value.number) == "string") &&
			isoly.Currency.is(value.currency)
	}
}
