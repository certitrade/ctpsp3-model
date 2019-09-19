import * as authly from "authly"
import { CreatableBase } from "../CreatableBase"

export interface Creatable extends CreatableBase {
	type: "card"
	account: string | authly.Token
	amount: number
}

export namespace Creatable {
	export function is(value: any | Creatable): value is Creatable {
		return typeof value == "object" &&
			value.type == "card" &&
			(typeof value.account == "string" || authly.Token.is(value.account)) &&
			typeof value.amount &&
			CreatableBase.is(value)
	}
}
