import * as isoly from "isoly"
import { Type } from "../Payment/Type"

export interface Base {
	type: Type
	service: string
	create: string
	amount: number
	currency: isoly.Currency
}

export namespace Base {
	export function is(value: any | Base) {
		return typeof(value) == "object" &&
			Type.is(value.type) &&
			typeof(value.service) == "string" &&
			typeof(value.create) == "string" &&
			typeof(value.amount) == "number" &&
			isoly.Currency.is(value.currency)
	}
}
