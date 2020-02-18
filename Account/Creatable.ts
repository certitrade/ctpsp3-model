import * as authly from "authly"
import * as gracely from "gracely"
import { Method as AccountMethod } from "./Method"
import { Customer } from "../Customer"

export interface AccountCreatable {
	id: authly.Identifier
	number: string
	customer?: Customer
	method: AccountMethod[]
}

// tslint:disable: no-shadowed-variable
export namespace AccountCreatable {
	export function is(value: Account | any): value is Account {
		return typeof value == "object" &&
			authly.Identifier.is(value.id) &&
			(value.number == undefined || typeof value.number == "string") &&
			(value.customer == undefined || typeof value.customer == "string") &&
			(value.method == undefined || AccountMethod.is(value.method))
	}
	export function flaw(value: Account | any): gracely.Flaw {
		return {
			type: "model.Account",
			flaws: typeof value != "object" ? undefined :
				[
					authly.Identifier.is(value.id) || { property: "id", type: "authly.Identifier" },
					(value.number == undefined || typeof value.number == "string") || { property: "number", type: "string" },
					(value.customer == undefined || typeof value.customer == "string") || { property: "customer", type: "string" },
					(value.method == undefined || AccountMethod.is(value.method)) || { property: "method", type: "Account.Method" },
				].filter(gracely.Flaw.is) as gracely.Flaw[],
		}
	}
	/*export async function verify(token: authly.Token): Promise<Account & authly.Payload | undefined> {
		const result = await verifyToken(token)
		return is(result) ? result : undefined
	}*/
	export type Method = AccountMethod
	export namespace Method {
		export const is = AccountMethod.is
		export const flaw = AccountMethod.flaw
		export type Card = AccountMethod.Card
		export namespace Card {
			export const is = AccountMethod.Card.is
		}
			/*
			export type Pan = AccountMethod.Card.Pan
			export namespace Pan {
				export const is = AccountMethod.Card.Pan.is
				export const scheme = AccountMethod.Card.Pan.scheme
				export const valid = AccountMethod.Card.Pan.valid
				export const iin = AccountMethod.Card.Pan.iin
				export const last4 = AccountMethod.Card.Pan.last4
			}
			export type Scheme = AccountMethod.Card.Scheme
			export namespace Scheme {
				export const is = AccountMethod.Card.Scheme.is
			}
			export type Expires = AccountMethod.Card.Expires
			export namespace Expires {
				export const is = AccountMethod.Card.Expires.is
				export type Month = AccountMethod.Card.Expires.Month
				export namespace Month {
					export const is = AccountMethod.Card.Expires.Month.is
				}
				export type Year = AccountMethod.Card.Expires.Year
				export namespace Year {
					export const is = AccountMethod.Card.Expires.Year.is
				}
				export type Type = AccountMethod.Card.Expires.Type
				export namespace Type {
					export const is = AccountMethod.Card.Expires.Type.is
				}
			}
		}*/
	}
}
