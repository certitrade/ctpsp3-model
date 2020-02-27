import * as gracely from "gracely"
import { Method as AccountMethod } from "./Method"
import { Customer } from "../Customer"
import { type } from "os"

export interface Creatable {
	number?: string
	customer?: Customer
	method: AccountMethod[]
}

// tslint:disable: no-shadowed-variable
export namespace Creatable {
	export function is(value: Creatable | any): value is Creatable {
		return typeof value == "object" &&
			(value.number == undefined || typeof value.number == "string") &&
			(value.customer == undefined || Customer.is(value.customer)) &&
			Array.isArray(value.method) && value.method.every(AccountMethod.is)
	}
	export function flaw(value: Creatable | any): gracely.Flaw {
		return {
			type: "model.Account",
			flaws: typeof value != "object" ? undefined :
				[
					value.number == undefined || typeof value.number == "string" || { property: "number", type: "string" },
					value.customer == undefined || Customer.is(value.customer) || { property: "customer", type: "Customer" },
				].concat(value.method.map((method: AccountMethod) => { return AccountMethod.is(method) || AccountMethod.flaw(method) }))
				.filter(gracely.Flaw.is) as gracely.Flaw[],
		}
	}
}
