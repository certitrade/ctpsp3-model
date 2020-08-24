import * as authly from "authly"
import * as gracely from "gracely"
import * as model from "../index"
import * as card from "@cardfunc/model"
import { Email } from "./Configuration/Email"
import { Mash } from "./Configuration/Mash"
import { Sms } from "./Configuration/Sms"
import { Creatable as MixedCreatable } from "./Configuration/Mixed/Creatable"

export interface Creatable {
	id?: authly.Identifier
	name: string
	terms?: string
	logotype?: string
	url: string
	card?: card.Merchant.Configuration
	email?: Email
	mash?: Mash
	sms?: Sms
	mixed?: MixedCreatable
}

export namespace Creatable {
	export function is(value: any | Creatable): value is Creatable {
		return (
			typeof value == "object" &&
			(value.id == undefined || authly.Identifier.is(value.id, 8)) &&
			typeof value.name == "string" &&
			(value.terms == undefined || typeof value.terms == "string") &&
			(value.logotype == undefined || typeof value.logotype == "string") &&
			typeof value.url == "string" &&
			(value.card == undefined || card.Merchant.Configuration.is(value.card)) &&
			(value.email == undefined || Email.is(value.email)) &&
			(value.mash == undefined || Mash.is(value.mash)) &&
			(value.sms == undefined || Sms.is(value.sms)) &&
			(value.mixed == undefined || MixedCreatable.is(value.mixed))
		)
	}
	export function flaw(value: any | Creatable): gracely.Flaw {
		return {
			type: "model.Merchant.Creatable",
			flaws:
				typeof value != "object"
					? undefined
					: ([
							value.id == undefined ||
								authly.Identifier.is(value.id, 8) || {
									property: "id",
									type: "authly.Identifier | undefined",
									condition: "length == 8",
								},
							typeof value.name == "string" || { property: "name", type: "string" },
							value.terms == undefined ||
								typeof value.terms == "string" || { property: "terms", type: "string | undefined" },
							value.logotype == undefined ||
								typeof value.logotype == "string" || { property: "logotype", type: "string | undefined" },
							typeof value.url == "string" || { property: "url", type: "string" },
							value.card == undefined ||
								card.Merchant.Configuration.is(value.card) || {
									property: "card",
									...card.Merchant.Configuration.flaw(value.card),
								},
							value.email == undefined || Email.is(value.email) || { property: "email", ...Email.flaw(value.email) },
							value.mash == undefined || Mash.is(value.mash) || { property: "mash", ...Mash.flaw(value.mash) },
							value.sms == undefined || Sms.is(value.sms) || { property: "sms", ...Sms.flaw(value.sms) },
							value.mixed == undefined ||
								MixedCreatable.is(value.mixed) || { property: "mixed", ...MixedCreatable.flaw(value.mixed) },
					  ].filter(gracely.Flaw.is) as gracely.Flaw[]),
		}
	}
	export function upgrade(value: model.Merchant.V1.Creatable): Creatable | undefined {
		let result: Creatable | undefined
		let failed = false
		if (!Object.keys(value.option).find(key => key != "card" && key != "email" && key != "mash" && key != "sms")) {
			const input = { ...value, url: "" }
			const option = input.option
			if (
				!(
					(option.card && !card.Merchant.Configuration.is(option.card)) ||
					(option.email && !model.Merchant.Configuration.Email.is(option.email)) ||
					(option.mash && !model.Merchant.Configuration.Mash.is(option.mash)) ||
					(option.sms && !model.Merchant.Configuration.Sms.is(option.sms))
				)
			) {
				delete input.option
				result = input
				if (option.card) {
					if (!card.Merchant.Configuration.is(option.card))
						failed = true
					else
						result = { ...result, card: option.card, url: option.card.url }
				}
				if (option.email) {
					if (!model.Merchant.Configuration.Email.is(option.email))
						failed = true
					else
						result = { ...result, email: option.email }
				}
				if (option.mash) {
					if (!model.Merchant.Configuration.Mash.is(option.mash))
						failed = true
					else
						result = { ...result, mash: option.mash }
				}
				if (option.sms) {
					if (!model.Merchant.Configuration.Sms.is(option.sms))
						failed = true
					else
						result = { ...result, sms: option.sms }
				}
				if (failed)
					result = undefined
			}
		}
		return result
	}
}
