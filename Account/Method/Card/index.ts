import * as isoly from "isoly"
import * as authly from "authly"
import { Card as PCard } from "../../../Payment/Card"
import { Type } from "../Type"
import { Creatable as CardCreatable } from "./Creatable"

export interface Card {
	type: Type
	created: isoly.DateTime
	token: authly.Token
	scheme: PCard.Scheme
	iin: string
	last4: string
	expires: PCard.Expires
}

// tslint:disable: no-shadowed-variable
export namespace Card {
	export function is(value: Card | any): value is Card {
		return typeof value == "object" &&
			Type.is(value.type) &&
			isoly.DateTime.is(value.created) &&
			authly.Token.is(value.token) &&
			PCard.Scheme.is(value.scheme) &&
			typeof value.iin == "string" && value.iin.length == 6 &&
			typeof value.last4 == "string" && value.last4.length == 4 &&
			PCard.Expires.is(value.expires)
	}
	export type Creatable = CardCreatable
	export namespace Creatable {
		export const is = CardCreatable.is
		export const verify = CardCreatable.verify
		export type Token = CardCreatable.Token
		export namespace Token {
			export const is = CardCreatable.Token.is
		}
	}
}
