import * as authly from "authly"
import { Method } from "./Method"
import { Customer } from "../Customer"
import { Balance } from "../Balance"

export interface Creatable {
	id?: authly.Identifier
	number?: string
	customer?: Customer
	method: Method.Creatable[]
	balance?: Balance.Creatable
}

export namespace Creatable {
	export function is(value: Creatable | any): value is Creatable {
		return (
			typeof value == "object" &&
			(value.id == undefined || authly.Identifier.is(value.id, 16)) &&
			(value.number == undefined || typeof value.number == "string") &&
			(value.customer == undefined || Customer.is(value.customer)) &&
			Array.isArray(value.method) &&
			value.method.every(Method.Creatable.is) &&
			(value.balance == undefined || Balance.Creatable.is(value.balance))
		)
	}
}
