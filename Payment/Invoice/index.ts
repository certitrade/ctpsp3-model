import { Base } from "../Base"
import { Verify } from "../Verify"
import { Terms as InvoiceTerms } from "./Terms"
import { Creatable as InvoiceCreatable } from "./Creatable"

export interface Invoice extends Base {
	type: "invoice"
	terms: InvoiceTerms
	verify?: Verify & { url: string }
}

export namespace Invoice {
	export function is(value: any | Invoice): value is Invoice {
		return (
			typeof value == "object" &&
			value.type == "invoice" &&
			InvoiceTerms.is(value.terms) &&
			(value.verify == undefined || (Verify.is(value.verify) && typeof value.verify.url == "string")) &&
			Base.is(value)
		)
	}
	export type Creatable = InvoiceCreatable
	export namespace Creatable {
		export const is = InvoiceCreatable.is
		export const flaw = InvoiceCreatable.flaw
	}
	export type Terms = InvoiceTerms
	export namespace Terms {
		export const is = InvoiceTerms.is
	}
}
