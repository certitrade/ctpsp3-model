import { Base } from "../Base"
import { Terms as InvoiceTerms } from "./Terms"
import { Creatable as InvoiceCreatable } from "./Creatable"

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
	export type Creatable = InvoiceCreatable
	export namespace Creatable {
		// tslint:disable-next-line: no-shadowed-variable
		export const is = InvoiceCreatable.is
		export const flaw = InvoiceCreatable.flaw
	}
	export type Terms = InvoiceTerms
	export namespace Terms {
		// tslint:disable-next-line:no-shadowed-variable
		export const is = InvoiceTerms.is
	}
}
