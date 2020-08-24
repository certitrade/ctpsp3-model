import * as gracely from "gracely"
import * as model from "../../index"

export interface Mash {
	url: string
	user: string
	key: string
	merchant: number
	option?: "all" | "invoice" | "installment" | "none"
	only?:
		| { type: "invoice"; terms: model.Payment.Invoice.Terms }
		| { type: "installment"; plan: model.Payment.Installment.Plan }
}
export namespace Mash {
	export function is(value: any | Mash): value is Mash {
		return (
			typeof value == "object" &&
			typeof value.url == "string" &&
			typeof value.user == "string" &&
			typeof value.key == "string" &&
			typeof value.merchant == "number" &&
			(value.option == undefined ||
				value.option == "all" ||
				value.option == "invoice" ||
				value.option == "installment" ||
				value.option == "none") &&
			(value.only == undefined ||
				(typeof value.only == "object" &&
					((value.only.type == "invoice" && model.Payment.Invoice.Terms.is(value.only.terms)) ||
						(value.only.type == "installment" && model.Payment.Installment.Plan.is(value.only.plan)))))
		)
	}
	export function flaw(value: any | Mash): gracely.Flaw {
		return {
			type: "model.Merchant.Configuration.Mash",
			flaws:
				typeof value != "object"
					? undefined
					: ([
							typeof value.url == "string" || { property: "url", type: "string" },
							typeof value.user == "string" || { property: "user", type: "string" },
							typeof value.key == "string" || { property: "key", type: "string" },
							typeof value.merchant == "number" || { property: "merchant", type: "number" },
							value.option == undefined ||
								value.option == "all" ||
								value.option == "invoice" ||
								value.option == "installment" ||
								value.option == "none" || { property: "option", type: "all | invoice | installment | none" },
							value.only == undefined ||
								(typeof value.only == "object" &&
									((value.only.type == "invoice" && model.Payment.Invoice.Terms.is(value.only.terms)) ||
										(value.only.type == "installment" && model.Payment.Installment.Plan.is(value.only.plan)))) || {
									property: "only",
									type:
										'{ type: "invoice", terms: model.Payment.Invoice.Terms } | { type: "installment", plan: model.Payment.Installment.Plan }',
								},
					  ].filter(gracely.Flaw.is) as gracely.Flaw[]),
		}
	}
	export function parse(data: string | undefined): Mash | undefined {
		const result = data && JSON.parse(data)
		return is(result) ? result : undefined
	}
}
