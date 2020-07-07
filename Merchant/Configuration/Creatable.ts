import * as card from "@cardfunc/model"
import { Email } from "./Email"
import { Mash } from "./Mash"
import { Sms } from "./Sms"
import { Creatable as MixedCreatable } from "./Mixed/Creatable"

export interface Creatable {
	card?: card.Merchant.Configuration
	email?: Email
	mash?: Mash
	sms?: Sms
	mixed?: MixedCreatable
}

export namespace Creatable {
	export function is(value: any | Creatable): value is Creatable {
		return typeof value == "object" &&
			(value.card == undefined || card.Merchant.Configuration.is(value.card)) &&
			(value.email == undefined || Email.is(value.email)) &&
			(value.mash == undefined || Email.is(value.mash)) &&
			(value.sms == undefined || Sms.is(value.sms)) &&
			(value.mixed == undefined || MixedCreatable.is(value.mixed))
	}
}
