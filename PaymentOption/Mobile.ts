import { PaymentOption } from "./PaymentOption"

export interface Mobile extends PaymentOption {
	type: "mobile"
}

export namespace Mobile {
	export function is(value: any | Mobile): value is Mobile {
		return PaymentOption.is(value) &&
			value.type == "mobile"
	}
}
