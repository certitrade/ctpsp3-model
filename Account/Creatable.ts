import * as authly from "authly"
import { Method } from "./Method"
import { Customer } from "../Customer"

export interface Creatable {
	id?: authly.Identifier
	number?: string
	customer?: Customer
	method: Method.Creatable[]
}

export namespace Creatable {
	export function is(value: Creatable | any): value is Creatable {
		return (
			typeof value == "object" &&
			(value.id == undefined || authly.Identifier.is(value.id, 16)) &&
			(value.number == undefined || typeof value.number == "string") &&
			(value.customer == undefined || Customer.is(value.customer)) &&
			Array.isArray(value.method) &&
			value.method.every(Method.Creatable.is)
		)
	}
}
