import * as authly from "authly"
import { verify as verifyToken } from "../../../../verify"
import { Card as PCard } from "../../../../Payment/Card"
import { Token as CToken } from "./Token"

export interface Creatable {
	type: "card"
	card?: authly.Token
	scheme: PCard.Scheme
	iin: string
	last4: string
	expires: PCard.Expires
	reference: string
}

// tslint:disable: no-shadowed-variable
export namespace Creatable {
	export function is(value: Creatable | any): value is Creatable {
		return typeof value == "object" &&
			value.type == "card" &&
			(value.card == undefined || authly.Token.is(value.card)) &&
			PCard.Scheme.is(value.scheme) &&
			typeof value.iin == "string" && value.iin.length == 6 &&
			typeof value.last4 == "string" && value.last4.length == 4 &&
			PCard.Expires.is(value.expires) &&
			typeof value.reference == "string"
	}
	export async function verify(token: authly.Token): Promise<Creatable | undefined> {
		const result = await verifyToken(token)
		return is(result) ? result : undefined
	}
	export type Token = CToken
	export namespace Token {
		export const is = CToken.is
	}
}
