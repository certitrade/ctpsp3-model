import * as isoly from "isoly"
import { Type } from "./Type"

export interface Base {
	id: string
	type: Type
	created: isoly.DateTime
	amount: number
	currency: isoly.Currency
}

export namespace Base {
	export function is(value: any | Base): value is Base {
		return typeof(value) == "object" &&
			Type.is(value.type) &&
			typeof(value.id) == "string" &&
			isoly.DateTime.is(value.created) &&
			typeof(value.amount) == "number" &&
			isoly.Currency.is(value.currency)
	}
}
