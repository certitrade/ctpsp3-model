import * as authly from "authly"
import * as gracely from "gracely"
import { Base } from "../Base"
import { Creatable as AccountCreatable } from "./Creatable"

export interface Account extends Base {
	type: "account"
	token: authly.Token
}

export namespace Account {

	export function is(value: any | Account): value is Account {
		return typeof value == "object" &&
			value.type == "account" &&
			authly.Token.is(value.token) &&
			Base.is(value)
	}

	export type Creatable = AccountCreatable
	export namespace Creatable {
	// tslint:disable: no-shadowed-variable
		export const is = AccountCreatable.is
		export const flaw = AccountCreatable.flaw
	}
}
