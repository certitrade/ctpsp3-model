import { Base } from "../Base"
import { Terms as InvoiceTerms } from "./Terms"

export interface Invoice extends Base {
	type: "invoice"
	terms: InvoiceTerms
}

export namespace Invoice {
	export function is(value: any | Invoice): value is Invoice {
		return typeof(value) == "object" &&
			value.type == "invoice" &&
			InvoiceTerms.is(value.terms) &&
			Base.is(value)
	}
	export type Terms = InvoiceTerms
	export namespace Terms {
		// tslint:disable-next-line:no-shadowed-variable
		export const is = InvoiceTerms.is
	}
}
