import { Method } from "./Method"
import { Customer } from "../Customer"

export interface Creatable {
	number?: string
	customer?: Customer
	method: Method.Creatable[]
}

// tslint:disable: no-shadowed-variable
export namespace Creatable {
	export function is(value: Creatable | any): value is Creatable {
		return typeof value == "object" &&
			(value.number == undefined || typeof value.number == "string") &&
			(value.customer == undefined || Customer.is(value.customer)) &&
			Array.isArray(value.method) && value.method.every(Method.Creatable.is)
	}
}
