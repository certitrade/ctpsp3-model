import * as gracely from "gracely"
import * as card from "@cardfunc/model"
import { Creatable as ConfigurationCreatable } from "./Creatable"
import { Email as ConfigurationEmail } from "./Email"
import { Mash as ConfigurationMash } from "./Mash"
import { Sms as ConfigurationSms } from "./Sms"
import { Mixed as ConfigurationMixed } from "./Mixed"

export interface Configuration {
	card?: card.Merchant.Configuration
	email?: ConfigurationEmail
	mash?: ConfigurationMash
	sms?: ConfigurationSms
	mixed?: ConfigurationMixed
}

export namespace Configuration {
	export function is(value: any | Configuration): value is Configuration {
		return typeof value == "object" &&
			(value.card == undefined || card.Merchant.Configuration.is(value.card)) &&
			(value.email == undefined || ConfigurationEmail.is(value.email)) &&
			(value.mash == undefined || ConfigurationEmail.is(value.mash)) &&
			(value.sms == undefined || ConfigurationSms.is(value.sms)) &&
			(value.mixed == undefined || ConfigurationMixed.is(value.mixed))
	}
	export function flaw(value: any | Configuration): gracely.Flaw {
		return {
			type: "model.Merchant.Configuration",
			flaws: typeof value != "object" ? undefined :
				[
					...(card.Merchant.Configuration.flaw(value.card).flaws ?? []),
					...(Email.flaw(value.email).flaws ?? []),
					...(Mash.flaw(value.mash).flaws ?? []),
					...(Sms.flaw(value.sms).flaws ?? []),
					value.mixed == undefined || typeof value.mixed == "string" || { property: "mixed", type: "authly.Token", condition: "Alternate key." },
				].filter(gracely.Flaw.is) as gracely.Flaw[],
		}
	}
	// tslint:disable: no-shadowed-variable
	export type Creatable = ConfigurationCreatable
	export namespace Creatable {
		export const is = ConfigurationCreatable.is
	}
	export type Email = ConfigurationEmail
	export namespace Email {
		export const is = ConfigurationEmail.is
		export const flaw = ConfigurationEmail.flaw
	}
	export type Mash = ConfigurationMash
	export namespace Mash {
		export const is = ConfigurationMash.is
		export const flaw = ConfigurationMash.flaw
		export const parse = ConfigurationMash.parse
	}
	export type Sms = ConfigurationSms
	export namespace Sms {
		export const is = ConfigurationSms.is
		export const flaw = ConfigurationSms.flaw
	}
	export type Mixed = ConfigurationMixed
	export namespace Mixed {
		export const is = ConfigurationMixed.is
		export type Creatable = ConfigurationMixed.Creatable
		export namespace Creatable {
			export const is = ConfigurationMixed.Creatable.is
			export const flaw = ConfigurationMixed.Creatable.flaw
		}
	}
}
