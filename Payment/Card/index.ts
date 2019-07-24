import { Base } from "../Base"
import { Issuer as CIssuer } from "./Issuer"
import { Creatable as CCreatable } from "./Creatable"

export interface Card extends Base {
	type: "card"
	account?: string
	issuer: CIssuer
}

export namespace Card {
	export function is(value: any | Card): value is Card {
		return typeof(value) == "object" &&
			value.type == "card" &&
			(value.account == undefined || typeof(value.account) == "string") &&
			Base.is(value)
	}
	export type Creatable = CCreatable
	export namespace Creatable {
// tslint:disable-next-line: no-shadowed-variable
		export const is = CCreatable.is
	}
	export type Issuer = CIssuer
	export namespace Issuer {
// tslint:disable-next-line: no-shadowed-variable
		export const is = CIssuer.is
	}
}
8