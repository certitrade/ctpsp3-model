import * as isoly from "isoly"
import * as authly from "authly"
import { Type } from "./Type"

export interface Base {
	id: string
	type: Type
	client?: authly.Identifier
	service: string
	created: isoly.DateTime
	amount: number
	currency: isoly.Currency
}

export namespace Base {
	export function is(value: any | Base): value is Base {
		return typeof(value) == "object" &&
			Type.is(value.type) &&
			(value.client == undefined || authly.Identifier.is(value.client)) &&
			typeof(value.service) == "string" &&
			typeof(value.id) == "string" &&
			isoly.DateTime.is(value.created) &&
			typeof(value.amount) == "number" &&
			isoly.Currency.is(value.currency) &&
			(typeof(value.verify) == "string" || value.verify == undefined) &&
			(typeof(value.token) == "string" || value.token == undefined)
	}
}
