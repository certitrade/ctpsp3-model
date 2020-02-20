import * as gracely from "gracely"
import { Method as AccountMethod } from "./Method"
import { Customer } from "../Customer"

export interface Creatable {
	number?: string
	customer?: Customer
	method: AccountMethod[]
}

// tslint:disable: no-shadowed-variable
export namespace Creatable {
	export function is(value: Account | any): value is Account {
		return typeof value == "object" &&
			(value.number == undefined || typeof value.number == "string") &&
			(value.customer == undefined || Customer.is(value.customer)) &&
			Array.isArray(value.method) && value.method.every(AccountMethod.is)
	}
	export function flaw(value: Account | any): gracely.Flaw {
		return {
			type: "model.Account",
			flaws: typeof value != "object" ? undefined :
				[
					value.number == undefined || typeof value.number == "string" || { property: "number", type: "string" },
					value.customer == undefined || Customer.is(value.customer) || { property: "customer", type: "Customer" },
					Array.isArray(value.method) && value.method.every(AccountMethod.is) || { property: "method", type: "Account.Method" },
				].filter(gracely.Flaw.is) as gracely.Flaw[],
		}
	}
}
