import * as isoly from "isoly"
import * as authly from "authly"
import { Type } from "./Type"
import { Status } from "./Status"

export interface Base {
	id: string
	type: Type
	reference?: string
	client?: authly.Identifier
	service: string
	created: isoly.DateTime
	amount: number
	currency: isoly.Currency
	descriptor?: string
	status: Status
}

export namespace Base {
	export function is(value: any | Base): value is Base {
		return typeof value == "object" &&
			Type.is(value.type) &&
			(typeof value.reference == "string" || value.reference == undefined) &&
			(value.client == undefined || authly.Identifier.is(value.client)) &&
			typeof value.service == "string" &&
			typeof value.id == "string" &&
			isoly.DateTime.is(value.created) &&
			typeof value.amount == "number" &&
			isoly.Currency.is(value.currency) &&
			(typeof value.verify == "string" || value.verify == undefined) &&
			(typeof value.token == "string" || value.token == undefined) &&
			(typeof value.descriptor == "string" || value.descriptor == undefined) &&
			Status.is(value.status)
2	}
}
