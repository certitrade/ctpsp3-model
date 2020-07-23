import * as authly from "authly"
import * as card from "@cardfunc/model"
import { Base } from "../Base"
import { Creatable as CardCreatable } from "./Creatable"

export interface Card extends Base {
	type: "card"
	card?: authly.Token,
	account?: string
	scheme: card.Card.Scheme
	iin: string
	last4: string
	expires: card.Card.Expires
}

export namespace Card {
	export function is(value: any | Card): value is Card {
		return typeof value == "object" &&
			value.type == "card" &&
			(value.card == undefined || authly.Token.is(value.card)) &&
			(value.account == undefined || typeof value.account == "string") &&
			card.Card.Scheme.is(value.scheme) &&
			typeof value.iin == "string" && value.iin.length == 6 &&
			typeof value.last4 == "string" && value.last4.length == 4 &&
			card.Card.Expires.is(value.expires) &&
			Base.is(value)
	}
	export type Creatable = CardCreatable
	export namespace Creatable {
// tslint:disable-next-line: no-shadowed-variable
		export const is = CardCreatable.is
		export const flaw = CardCreatable.flaw
		export const from = CardCreatable.from
	}
	export type Scheme = card.Card.Scheme
	export namespace Scheme {
// tslint:disable-next-line: no-shadowed-variable
		export const is = card.Card.Scheme.is
	}
	export type Expires = card.Card.Expires
	export namespace Expires {
// tslint:disable-next-line: no-shadowed-variable
		export const is = card.Card.Expires.is
	}
}
