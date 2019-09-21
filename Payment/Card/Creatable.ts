import * as authly from "authly"
import { CreatableBase } from "../CreatableBase"

export interface Creatable extends CreatableBase {
	type: "card"
	account?: string
	reference?: authly.Token
	amount?: number
}

export namespace Creatable {
	export function is(value: any | Creatable): value is Creatable {
		return typeof value == "object" &&
			value.type == "card" &&
			(
				typeof value.account == "string" && typeof value.amount == "number" && value.reference == undefined ||
				value.account == undefined && value.amount == undefined && authly.Token.is(value.reference)
			) &&
			CreatableBase.is(value)
	}
}
