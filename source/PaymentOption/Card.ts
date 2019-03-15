import { PaymentOption } from "./PaymentOption"

export interface Card extends PaymentOption {
	type: "card"
}

export namespace Card {
	export function is(value: any | Card): value is Card {
		return PaymentOption.is(value) &&
			value.type == "card"
	}
}
