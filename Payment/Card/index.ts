import { Base } from "../Base"
import { Scheme as CardScheme } from "./Scheme"
import { Creatable as CCreatable } from "./Creatable"

export interface Card extends Base {
	type: "card"
	account?: string
	scheme: CardScheme
}

export namespace Card {
	export function is(value: any | Card): value is Card {
		return typeof value == "object" &&
			value.type == "card" &&
			(value.account == undefined || typeof value.account == "string") &&
			Base.is(value)
	}
	export type Creatable = CCreatable
	export namespace Creatable {
// tslint:disable-next-line: no-shadowed-variable
		export const is = CCreatable.is
	}
	export type Issuer = CardScheme
	export namespace Issuer {
// tslint:disable-next-line: no-shadowed-variable
		export const is = CardScheme.is
	}
}
