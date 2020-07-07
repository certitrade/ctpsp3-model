import * as card from "@cardfunc/model"
import { Creatable as BCreatable } from "./Creatable"
import { Email as BEmail } from "./Email"
import { Mash as BMash } from "./Mash"
import { Sms as BSms } from "./Sms"
import { Mixed as BMixed } from "./Mixed"

export interface Configuration {
	card?: card.Merchant.Configuration
	email?: BEmail
	mash?: BMash
	sms?: BSms
	mixed?: BMixed
}

export namespace Configuration {
	export function is(value: any | Configuration): value is Configuration {
		return typeof value == "object" &&
			(value.card == undefined || card.Merchant.Configuration.is(value.card)) &&
			(value.email == undefined || BEmail.is(value.email)) &&
			(value.mash == undefined || BEmail.is(value.mash)) &&
			(value.sms == undefined || BSms.is(value.sms)) &&
			(value.mixed == undefined || BMixed.is(value.mixed))
	}
	// tslint:disable: no-shadowed-variable
	export type Creatable = BCreatable
	export namespace Creatable {
		export const is = BCreatable.is
	}
	export type Email = BEmail
	export namespace Email {
		export const is = BEmail.is
		export const flaw = BEmail.flaw
	}
	export type Mash = BMash
	export namespace Mash {
		export const is = BMash.is
		export const flaw = BMash.flaw
		export const parse = BMash.parse
	}
	export type Sms = BSms
	export namespace Sms {
		export const is = BSms.is
		export const flaw = BSms.flaw
	}
	export type Mixed = BMixed
	export namespace Mixed {
		export const is = BMixed.is
		export type Creatable = BMixed.Creatable
		export namespace Creatable {
			export const is = BMixed.Creatable.is
			export const flaw = BMixed.Creatable.flaw
		}
	}
}
