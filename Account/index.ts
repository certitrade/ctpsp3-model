import * as authly from "authly"
import * as gracely from "gracely"
import { Method as AccountMethod } from "./Method"
import { Creatable as AccountCreatable  } from "./Creatable"

export interface Account extends AccountCreatable {
	id: authly.Identifier
}

// tslint:disable: no-shadowed-variable
export namespace Account {
	export function is(value: Account | any): value is Account {
		return typeof value == "object" &&
			authly.Identifier.is(value.id) &&
			AccountCreatable.is(value)
	}
	export function flaw(value: Account | any): gracely.Flaw {
		return {
			type: "model.Account",
			flaws: typeof value != "object" ? undefined :
				[
					authly.Identifier.is(value.id) || { property: "id", type: "authly.Identifier" },
					AccountCreatable.is(value) || { ...AccountCreatable.flaw(value).flaws },
				].filter(gracely.Flaw.is) as gracely.Flaw[],
		}
	}
	export type Creatable = AccountCreatable
	export namespace Creatable {
		export const is = AccountCreatable.is
		export const flaw = AccountCreatable.flaw
	}
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
