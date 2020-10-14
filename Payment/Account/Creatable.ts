import * as gracely from "gracely"
import * as authly from "authly"
import { CreatableBase } from "../CreatableBase"

export interface Creatable extends CreatableBase {
	type: "account"
	token?: authly.Token // @deprecated
	account?: authly.Identifier
}

export namespace Creatable {
	export function is(value: any | Creatable): value is Creatable {
		return (
			typeof value == "object" &&
			value.type == "account" &&
			((authly.Token.is(value.token) && value.account == undefined) ||
				(value.token == undefined && authly.Identifier.is(value.account, 16))) &&
			CreatableBase.is(value)
		)
	}
	export function flaw(value: any | Creatable): gracely.Flaw {
		return {
			type: "model.Payment.Card.Creatable",
			flaws:
				typeof value != "object"
					? undefined
					: ([
							value.type == "account" || { property: "type", type: '"account"' },
							authly.Token.is(value.token) ||
								authly.Identifier.is(value.account, 16) || {
									property: "token",
									type: "authly.Token",
									condition: "either token or account should be set",
								},
							authly.Identifier.is(value.account, 16) ||
								authly.Token.is(value.token) || {
									property: "account",
									type: "authly.Identifier | undefined",
									condition: "account.length == 16 and either token or account should be set",
								},
							CreatableBase.is(value) || { ...CreatableBase.flaw(value).flaws },
					  ].filter(gracely.Flaw.is) as gracely.Flaw[]),
		}
	}
}
