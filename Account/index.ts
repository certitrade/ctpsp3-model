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
	export async function verify(token: authly.Token): Promise<Account | undefined> {
		const algorithm = authly.Algorithm.RS256("MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA+u7ZnXr3XecpcgEbYAPLOrNKZ1V0+JxiPawhOJ+LrbfP5czPB2VnWLyD8xVnZ+0rZnJrG4Iu+AZmpdT44KNAqTpN7xQirLlg+bfUJqGlEDQiSw2rJaa+/Y+dCvoC3MFVtTWMlre6bVmCbX+PIl8tg8rSNN7E+tkkl7T4UuHt/ONVOOOvwCJDo5I0SOotfHSCIckc/CkxLEELgIiR8F800+Ww5ofwzJwLw3zLw0BvqzB4OH74v82DS1mYpS38ZQwQKMcE/BP6eyHokHlmeOaXo993RyWfuVj3ocpbOACaNzqNp9eiREmYY8RfO4r9ZNhkrfetoQxPqQcG+FAiObv/EQIDAQAB")
		const result = await authly.Verifier.create("payfunc", algorithm)!.verify(token)
		return is(result) ? result : undefined
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
			export const flaw = AccountMethod.Card.flaw
		}
	}
}
