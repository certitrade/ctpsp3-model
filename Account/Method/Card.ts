import * as authly from "authly"
import { Card as PCard } from "../../Payment/Card"
import { Base } from "./Base"

export interface Card extends Base {
	reference: authly.Token
	scheme: PCard.Scheme
	iin: string
	last4: string
	expires: PCard.Expires
}

// tslint:disable: no-shadowed-variable
export namespace Card {
	export function is(value: Card | any): value is Card {
		return typeof value == "object" &&
			authly.Identifier.is(value.id) &&
			(value.reference == undefined || typeof value.reference == "string") &&
			(value.account == undefined || authly.Token.is(value.account)) &&
			PCard.Scheme.is(value.scheme) &&
			typeof value.iin == "string" && value.iin.length == 6 &&
			typeof value.last4 == "string" && value.last4.length == 4 &&
			PCard.Expires.is(value.expires)
	}
}
