import * as authly from "authly"
import * as gracely from "gracely"
import * as card from "@cardfunc/model"
import * as model from "../index"
import { Email } from "./Configuration/Email"
import { Mash } from "./Configuration/Mash"
import { Sms } from "./Configuration/Sms"

export interface Key {
	sub: string
	iss: string
	aud: "public" | "private"
	iat: number
	exp?: number
	name: string
	user?: string
	url: string
	logotype?: string
	terms?: string
	card?: card.Merchant.Configuration
	email?: Email
	mash?: Mash
	sms?: Sms
	mixed?: authly.Token
}

export namespace Key {
	export function is(value: any | Key): value is Key {
		return typeof value == "object" &&
			authly.Identifier.is(value.sub) &&
			typeof value.iss == "string" &&
			(value.aud == "public" || value.aud == "private") &&
			typeof value.iat == "number" &&
			(value.exp == undefined || typeof value.exp == "number") &&
			typeof value.name == "string" &&
			(value.user == undefined || typeof value.user == "string") &&
			typeof value.url == "string" &&
			(value.logotype == undefined || typeof value.logotype == "string") &&
			(value.terms == undefined || typeof value.terms == "string") &&
			(value.card == undefined || card.Merchant.Configuration.is(value.card)) &&
			(value.email == undefined || Email.is(value.email)) &&
			(value.mash == undefined || Mash.is(value.mash)) &&
			(value.sms == undefined || Sms.is(value.sms)) &&
			(value.mixed == undefined || authly.Token.is(value.mixed)) &&
			value.option == undefined // failing non-upgraded V1 keys with options set to force an upgrade of key.
	}
	export function flaw(value: any | Key): gracely.Flaw {
		return {
			type: "model.Key",
			flaws: typeof value != "object" ? undefined :
				[
					typeof value.sub == "string" || { property: "sub", type: "authly.Identifier", condition: "Merchant identifier." },
					typeof value.iss == "string" || { property: "iss", type: "string", condition: "Key issuer." },
					typeof value.aud == "string" || { property: "aud", type: `"public" | "private"`, condition: "Key audience." },
					typeof value.iat == "number" || { property: "iat", type: "number", condition: "Issued timestamp." },
					typeof value.name == "string" || { property: "name", type: "string" },
					value.user == undefined || typeof value.user == "string" || { property: "user", type: "string | undefined" },
					typeof value.url == "string" || { property: "url", type: "string" },
					...(card.Merchant.Configuration.flaw(value.card).flaws ?? []),
					...(Email.flaw(value.card).flaws ?? []),
					...(Mash.flaw(value.card).flaws ?? []),
					...(Sms.flaw(value.card).flaws ?? []),
					value.mixed == undefined || typeof value.mixed == "string" || { property: "mixed", type: "authly.Token", condition: "Alternate key." },
				].filter(gracely.Flaw.is) as gracely.Flaw[],
		}
	}
	export async function unpack(key: authly.Token): Promise<Key | undefined> {
		const payload: authly.Payload | undefined = await authly.Verifier.create("public").verify(key)
		return is(payload) ? payload : undefined
	}
	export function upgrade(key: Key | model.Merchant.V1.Key | undefined, inner?: card.Merchant.Configuration | undefined): Key | undefined {
		let result: Key | undefined
		if (key == undefined)
			result = undefined
		else if (is(key))
			result = key
		else {
			result = {
				sub: key.sub,
				iss: key.iss,
				aud: typeof key.aud == "string" ? key.aud : "private",
				iat: key.iat,
				name: key.name,
				url: "",
			}
			if (typeof key.option.card == "string" || inner)
				result = typeof key.option.card == "string" && card.Merchant.Configuration.is(inner) ? { ...result, card: inner, url: inner.url } : undefined
			if (result && key.option.email)
				result = model.Merchant.Configuration.Email.is(key.option.email) ? { ...result, email: key.option.email } : undefined
			if (result && key.option.mash)
				result = model.Merchant.Configuration.Mash.is(key.option.mash) ? { ...result, mash: key.option.mash } : undefined
			if (result && key.option.sms)
				result = model.Merchant.Configuration.Sms.is(key.option.sms) ? { ...result, sms: key.option.sms } : undefined
		}
		return result
	}
}
