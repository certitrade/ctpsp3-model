import * as isoly from "isoly"
import * as authly from "authly"
import { Base } from "../Base"
import { Creatable as CustomerCreatable } from "./Creatable"

export interface Customer extends Base {
	type: "customer"
	token?: authly.Token // @deprecated
	customer?: authly.Identifier // @deprecated
	due?: isoly.DateTime
	schedule?: isoly.DateTime[]
	charge?: "auto" | "balance"
}

export namespace Customer {
	export function is(value: any | Customer): value is Customer {
		return (
			typeof value == "object" &&
			value.type == "customer" &&
			((authly.Token.is(value.token) && value.customer == undefined) ||
				(value.token == undefined && (value.customer == undefined || authly.Identifier.is(value.customer, 16)))) &&
			(value.due == undefined || isoly.DateTime.is(value.due)) &&
			(value.schedule == undefined || (Array.isArray(value.schedule) && value.schedule.every(isoly.DateTime.is))) &&
			(value.charge == undefined || value.charge == "auto" || value.charge == "balance") &&
			Base.is(value)
		)
	}

	export type Creatable = CustomerCreatable
	export namespace Creatable {
		export const is = CustomerCreatable.is
		export const flaw = CustomerCreatable.flaw
	}
}
