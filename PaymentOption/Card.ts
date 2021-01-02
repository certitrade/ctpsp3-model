import { Card as PaymentCard } from "../Payment/Card"
import { Base } from "./Base"

export interface Card extends Base {
	type: "card"
	schemes: PaymentCard.Scheme[]
}

export namespace Card {
	export function is(value: any | Card): value is Card {
		return Base.is(value) && value.type == "card"
	}
}
