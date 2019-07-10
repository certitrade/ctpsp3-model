import * as isoly from "isoly"
import { Type } from "../Payment/Type"

export interface Base {
	type: Type
	service: string
	create?: { authorization?: string, location: string }
	amount: number
	currency: isoly.Currency
}

export namespace Base {
	export function is(value: any | Base) {
		return typeof(value) == "object" &&
			Type.is(value.type) &&
			typeof(value.service) == "string" &&
			(
				typeof(value.create) == "object" &&
				(typeof(value.create.authorization) == "string" || value.create.authorization == undefined) &&
				typeof(value.create.location) == "string" ||
				value.create == undefined
			) &&
			typeof(value.amount) == "number" &&
			isoly.Currency.is(value.currency)
	}
}