import * as gracely from "gracely"
import * as card from "@cardfunc/model"
import { Mixed as ConfigurationMixed } from "./Mixed"

export interface KeyInfo {
	card?: card.Merchant.Configuration.KeyInfo
	email?: string
	mash?: string
	sms?: string
	mixed?: ConfigurationMixed
}

export namespace KeyInfo {
	export function is(value: any | KeyInfo): value is KeyInfo {
		return (
			typeof value == "object" &&
			(value.card == undefined || card.Merchant.Configuration.KeyInfo.is(value.card)) &&
			(value.email == undefined || typeof value.email == "string") &&
			(value.mash == undefined || typeof value.mash == "string") &&
			(value.sms == undefined || typeof value.sms == "string") &&
			(value.mixed == undefined || ConfigurationMixed.is(value.mixed))
		)
	}
	export function flaw(value: any | KeyInfo): gracely.Flaw {
		return {
			type: "model.Merchant.Configuration.KeyInfo",
			flaws:
				typeof value != "object"
					? undefined
					: ([
							...(card.Merchant.Configuration.flaw(value.card).flaws ?? []),
							value.email == undefined ||
								typeof value.email == "string" || { property: "email", type: "string | undefined" },
							value.mash == undefined ||
								typeof value.mash == "string" || { property: "mash", type: "string | undefined" },
							value.sms == undefined || typeof value.sms == "string" || { property: "sms", type: "string | undefined" },
							value.mixed == undefined ||
								ConfigurationMixed.is(value.mixed) || { property: "mixed", type: "authly.Token" },
					  ].filter(gracely.Flaw.is) as gracely.Flaw[]),
		}
	}
}
