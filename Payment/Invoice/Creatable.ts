import * as gracely from "gracely"
import { Verify } from "../Verify"
import { Terms } from "./Terms"
import { CreatableBase } from "../CreatableBase"

export interface Creatable extends CreatableBase {
	type: "invoice"
	terms: Terms
	verify: Verify
}

export namespace Creatable {
	export function is(value: any | Creatable): value is Creatable {
		return (
			typeof value == "object" &&
			value.type == "invoice" &&
			Terms.is(value.terms) &&
			Verify.is(value.verify) &&
			CreatableBase.is(value)
		)
	}
	export function flaw(value: any | Creatable): gracely.Flaw {
		return {
			type: "model.Payment.Invoice.Creatable",
			flaws:
				typeof value != "object"
					? undefined
					: [
							value.type == "invoice" || { property: "type", type: '"invoice"' },
							Terms.is(value.terms) || { property: "terms", ...Terms.flaw(value.terms) },
							CreatableBase.is(value) || { ...CreatableBase.flaw(value).flaws },
					  ].filter(gracely.Flaw.is),
		}
	}
}
