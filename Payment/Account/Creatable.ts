import * as gracely from "gracely"
import * as authly from "authly"
import { CreatableBase } from "../CreatableBase"
import * as account from "../../Account"

export interface Creatable extends CreatableBase {
	type: "account"
	account: authly.Identifier | authly.Token
}

export namespace Creatable {
	export function is(value: any | Creatable): value is Creatable {
		return typeof value == "object" &&
			value.type == "account" &&
			(authly.Identifier.is(value.account) || authly.Token.is(value.account)) &&
			CreatableBase.is(value)
	}
	export function flaw(value: any | Creatable): gracely.Flaw {
		return {
			type: "model.Payment.Card.Creatable",
			flaws: typeof value != "object" ? undefined :
				[
					value.type == "account" || { property: "type", type: '"account"' },
					authly.Identifier.is(value.account) || authly.Token.is(value.account) || { property: "type", type: "authly.Identifier | authly.Token" },
					CreatableBase.is(value) || { ...CreatableBase.flaw(value).flaws },
				].filter(gracely.Flaw.is) as gracely.Flaw[],
		}
	}
}
