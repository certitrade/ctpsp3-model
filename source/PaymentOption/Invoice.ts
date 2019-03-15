import { PaymentOption } from "./PaymentOption"

export interface Invoice extends PaymentOption {
	type: "invoice"
}

export namespace Invoice {
	export function is(value: any | Invoice): value is Invoice {
		return PaymentOption.is(value) &&
			value.type == "invoice"
	}
}
