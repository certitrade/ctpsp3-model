import * as authly from "authly"
import { Base } from "../Base"
import { Creatable as AccountCreatable } from "./Creatable"

export interface Account extends Base {
	type: "account"
	token: authly.Token
	account?: authly.Identifier
}

export namespace Account {
	export function is(value: any | Account): value is Account {
		return (
			typeof value == "object" &&
			value.type == "account" &&
			authly.Token.is(value.token) &&
			(value.account == undefined || authly.Identifier.is(value.account)) &&
			Base.is(value)
		)
	}

	export type Creatable = AccountCreatable
	export namespace Creatable {
		export const is = AccountCreatable.is
		export const flaw = AccountCreatable.flaw
	}
}
