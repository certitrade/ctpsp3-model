import { PaymentOption } from "./PaymentOption"
import { InvoiceOption } from "./InvoiceOption";

export interface Invoice extends PaymentOption {
	type: "invoice"
	options: InvoiceOption[]
}

export namespace Invoice {
	export function is(value: any | Invoice): value is Invoice {
		return PaymentOption.is(value) &&
			value.type == "invoice"
	}
}
