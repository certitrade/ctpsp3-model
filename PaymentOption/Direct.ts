import { PaymentOption } from "./PaymentOption"

export interface Direct extends PaymentOption {
	type: "direct"
	banks: { name: string }[]
}

export namespace Direct {
	export function is(value: any | Direct): value is Direct {
		return PaymentOption.is(value) &&
			value.type == "direct"
	}
}
