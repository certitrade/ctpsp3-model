import { Base } from "./Base"
import { Issuer as CIssuer } from "../Payment/Card/Issuer"

export interface Card extends Base {
	type: "card"
	issuers: CIssuer[]
}

export namespace Card {
	export function is(value: any | Card): value is Card {
		return Base.is(value) &&
			value.type == "card"
	}
}
