import * as authly from "authly"
import * as gracely from "gracely"
import { Base } from "../Base"
import { Creatable as AccountCreatable } from "./Creatable"

export interface Account extends Base {
	type: "account"
	account: authly.Identifier
}

export namespace Account {
	export function is(value: any | Account): value is Account {
		return typeof value == "object" &&
			value.type == "account" &&
			authly.Identifier.is(value.account) &&
			Base.is(value)
	}

	export type Creatable = AccountCreatable
	export namespace Creatable {
	// tslint:disable: no-shadowed-variable
		export const is = AccountCreatable.is
		export const flaw = AccountCreatable.flaw
	}
}
