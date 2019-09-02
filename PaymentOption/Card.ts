import { Base } from "./Base"
import { Scheme as CardScheme } from "../Payment/Card/Scheme"

export interface Card extends Base {
	type: "card"
	schemes: CardScheme[]
}

export namespace Card {
	export function is(value: any | Card): value is Card {
		return Base.is(value) &&
			value.type == "card"
	}
}
