import * as authly from "authly"
import * as gracely from "gracely"
import { Method as AccountMethod } from "./Method"
import { Customer } from "../Customer"
import { AccountCreatable as Creatable } from "./Creatable"

export interface Account extends Creatable {
	id: authly.Identifier
}

// tslint:disable: no-shadowed-variable
export namespace Account {
	export function is(value: Account | any): value is Account {
		return typeof value == "object" &&
			authly.Identifier.is(value.id) &&
			(value.number == undefined || typeof value.number == "string") &&
			(value.customer == undefined || typeof value.customer == "string") &&
			(value.method == undefined || AccountMethod.is(value.method))
	}
	export function flaw(value: Account | any): gracely.Flaw {
		return {
			type: "model.Account",
			flaws: typeof value != "object" ? undefined :
				[
					authly.Identifier.is(value.id) || { property: "id", type: "authly.Identifier" },
					(value.number == undefined || typeof value.number == "string") || { property: "number", type: "string" },
					(value.customer == undefined || typeof value.customer == "string") || { property: "customer", type: "string" },
					(value.method == undefined || AccountMethod.is(value.method)) || { property: "method", type: "Account.Method" },
				].filter(gracely.Flaw.is) as gracely.Flaw[],
		}
	}
	/*export async function verify(token: authly.Token): Promise<Account & authly.Payload | undefined> {
		const result = await verifyToken(token)
		return is(result) ? result : undefined
	}*/
	export type Method = AccountMethod
	export namespace Method {
		export const is = AccountMethod.is
		export const flaw = AccountMethod.flaw
		export type Card = AccountMethod.Card
		export namespace Card {
			export const is = AccountMethod.Card.is
		}
	}
}
