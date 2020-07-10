import * as card from "@cardfunc/model"
import { Creatable as CCreatable } from "./Creatable"
import { Email as CEmail } from "./Email"
import { Mash as CMash } from "./Mash"
import { Sms as CSms } from "./Sms"
import { Mixed as CMixed } from "./Mixed"

export interface Configuration {
	card?: card.Merchant.Configuration
	email?: CEmail
	mash?: CMash
	sms?: CSms
	mixed?: CMixed
}

export namespace Configuration {
	export function is(value: any | Configuration): value is Configuration {
		return typeof value == "object" &&
			(value.card == undefined || card.Merchant.Configuration.is(value.card)) &&
			(value.email == undefined || CEmail.is(value.email)) &&
			(value.mash == undefined || CEmail.is(value.mash)) &&
			(value.sms == undefined || CSms.is(value.sms)) &&
			(value.mixed == undefined || CMixed.is(value.mixed))
	}
	// tslint:disable: no-shadowed-variable
	export type Creatable = CCreatable
	export namespace Creatable {
		export const is = CCreatable.is
	}
	export type Email = CEmail
	export namespace Email {
		export const is = CEmail.is
		export const flaw = CEmail.flaw
	}
	export type Mash = CMash
	export namespace Mash {
		export const is = CMash.is
		export const flaw = CMash.flaw
		export const parse = CMash.parse
	}
	export type Sms = CSms
	export namespace Sms {
		export const is = CSms.is
		export const flaw = CSms.flaw
	}
	export type Mixed = CMixed
	export namespace Mixed {
		export const is = CMixed.is
		export type Creatable = CMixed.Creatable
		export namespace Creatable {
			export const is = CMixed.Creatable.is
			export const flaw = CMixed.Creatable.flaw
		}
	}
}
