import * as authly from "authly"
import { Customer } from "../Customer"
import { Method as AccountMethod } from "./Method"
import { Creatable as AccountCreatable  } from "./Creatable"

export interface Account {
	id: authly.Identifier
	number?: string
	customer?: Customer
	method: AccountMethod[]
}

// tslint:disable: no-shadowed-variable
export namespace Account {
	export function is(value: Account | any): value is Account {
		return typeof value == "object" &&
			authly.Identifier.is(value.id) &&
			(value.number == undefined || typeof value.number == "string") &&
			(value.customer == undefined || Customer.is(value.customer)) &&
			Array.isArray(value.method) && value.method.every(AccountMethod.is)
	}
	export type Creatable = AccountCreatable
	export namespace Creatable {
		export const is = AccountCreatable.is
	}
	export type Method = AccountMethod
	export namespace Method {
		export const verify = AccountMethod.verify
		export const is = AccountMethod.is
		export type Card = AccountMethod.Card
		export namespace Card {
			export const is = AccountMethod.Card.is
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
