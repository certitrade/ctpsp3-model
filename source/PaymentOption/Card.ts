import { PaymentOption } from "./PaymentOption"
import { CardIssuer } from "./CardIssuer";

export interface Card extends PaymentOption {
	type: "card"
	issuers: CardIssuer[]
}

export namespace Card {
	export function is(value: any | Card): value is Card {
		return PaymentOption.is(value) &&
			value.type == "card"
	}
}
