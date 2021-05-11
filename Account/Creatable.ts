import * as isoly from "isoly"
import * as authly from "authly"
import { Customer } from "@payfunc/model-base"
import { Frequency } from "../Frequency"
import { Schedule } from "../Schedule"
import { Method } from "./Method"

export interface Creatable {
	id?: authly.Identifier
	number?: string
	customer?: Customer
	method: Method.Creatable[]

	currency?: isoly.Currency
	limit?:
		| number
		| {
				hard?: number
				soft?: number
				margin?: number
		  }
	schedule?: Frequency | Schedule
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
			(value.currency == undefined || isoly.Currency.is(value.currency)) &&
			(value.limit == undefined ||
				typeof value.limit == "number" ||
				(typeof value.limit == "object" &&
					(value.limit.hard == undefined || typeof value.limit.hard == "number") &&
					(value.limit.soft == undefined || typeof value.limit.soft == "number") &&
					(value.limit.margin == undefined || typeof value.limit.margin == "number"))) &&
			(Frequency.is(value.schedule) || Schedule.is(value.schedule) || value.schedule == undefined)
		)
	}
}
