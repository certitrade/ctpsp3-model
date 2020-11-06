import * as authly from "authly"
import * as isoly from "isoly"
import { Base } from "../Base"
import { Creatable as AccountCreatable } from "./Creatable"

export interface Account extends Base {
	type: "account"
	token?: authly.Token // @deprecated
	account?: authly.Identifier
	due?: isoly.DateTime
	schedule?: isoly.DateTime[]
}

export namespace Account {
	export function is(value: any | Account): value is Account {
		return (
			typeof value == "object" &&
			value.type == "account" &&
			((authly.Token.is(value.token) && value.account == undefined) ||
				(value.token == undefined && authly.Identifier.is(value.account, 16))) &&
			(value.due == undefined || isoly.DateTime.is(value.due)) &&
			(value.schedule == undefined || (Array.isArray(value.schedule) && value.schedule.every(isoly.DateTime.is))) &&
			Base.is(value)
		)
	}

	export type Creatable = AccountCreatable
	export namespace Creatable {
		export const is = AccountCreatable.is
		export const flaw = AccountCreatable.flaw
	}
}
