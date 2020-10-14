import * as gracely from "gracely"
import * as authly from "authly"
import { CreatableBase } from "../CreatableBase"

export interface Creatable extends CreatableBase {
	type: "account"
	token: authly.Token
	account?: authly.Identifier
}

export namespace Creatable {
	export function is(value: any | Creatable): value is Creatable {
		return (
			typeof value == "object" &&
			value.type == "account" &&
			authly.Token.is(value.token) &&
			(value.account == undefined || authly.Identifier.is(value.account, 16)) &&
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
							authly.Token.is(value.token) || { property: "token", type: "authly.Token" },
							value.account == undefined ||
								authly.Identifier.is(value.account, 16) || {
									property: "token",
									type: "authly.Identifier | undefined",
									condition: "length == 16",
								},
							CreatableBase.is(value) || { ...CreatableBase.flaw(value).flaws },
					  ].filter(gracely.Flaw.is) as gracely.Flaw[]),
		}
	}
}
