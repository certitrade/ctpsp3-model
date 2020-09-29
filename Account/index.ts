import * as authly from "authly"
import { Customer } from "../Customer"
import { Link as AccountLink } from "./Link"
import { Method as AccountMethod } from "./Method"
import { Creatable as AccountCreatable } from "./Creatable"

export interface Account {
	id: authly.Identifier
	number?: string
	customer?: Customer
	method: AccountMethod[]
	link?: AccountLink
}

export namespace Account {
	export function is(value: Account | any): value is Account {
		return (
			typeof value == "object" &&
			authly.Identifier.is(value.id, 16) &&
			(value.number == undefined || typeof value.number == "string") &&
			(value.customer == undefined || Customer.is(value.customer)) &&
			Array.isArray(value.method) &&
			value.method.every(AccountMethod.is)
		)
	}
	export function generateId(): authly.Identifier {
		return authly.Identifier.generate(16)
	}
	export type Creatable = AccountCreatable
	export namespace Creatable {
		export const is = AccountCreatable.is
	}
	export type Link = AccountLink
	export namespace Link {
		export const is = AccountLink.is
		export type Creatable = AccountLink.Creatable
		export namespace Creatable {
			export const is = AccountLink.Creatable.is
		}
	}
	export type Method = AccountMethod
	export namespace Method {
		export const is = AccountMethod.is
		export const verify = AccountMethod.verify
		export type Card = AccountMethod.Card
		export namespace Card {
			export const is = AccountMethod.Card.is
			export type Creatable = AccountMethod.Card.Creatable
			export namespace Creatable {
				export const is = AccountMethod.Card.Creatable.is
				export const verify = AccountMethod.Card.Creatable.verify
				export type Token = AccountMethod.Card.Creatable.Token
				export namespace Token {
					export const is = AccountMethod.Card.Creatable.Token.is
				}
			}
		}
		export type Creatable = AccountMethod.Creatable
		export namespace Creatable {
			export const is = AccountMethod.Creatable.is
		}
		export type Type = AccountMethod.Type
		export namespace Type {
			export const is = AccountMethod.Type.is
		}
	}
}
