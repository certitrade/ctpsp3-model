import { PaymentOption } from "./PaymentOption"

export interface Installment extends PaymentOption {
	type: "installment"
}

export namespace Installment {
	export function is(value: any | Installment): value is Installment {
		return PaymentOption.is(value) &&
			value.type == "installment"
	}
}
