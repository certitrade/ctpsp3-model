import * as authly from "authly"
import * as gracely from "gracely"
import * as isoly from "isoly"
import * as card from "@cardfunc/model"
import * as model from "../../index"
import { KeyInfo as KeyKeyInfo } from "./KeyInfo"
import { Configuration } from "../Configuration"

export interface Key extends Configuration {
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
	currency?: isoly.Currency
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
			(value.currency == undefined || isoly.Currency.is(value.currency)) &&
			value.option == undefined && // failing non-upgraded V1 keys with options set to force an upgrade of key.
			Configuration.is(value)
	}
	export function flaw(value: any | Key): gracely.Flaw {
		return {
			type: "model.Merchant.Key",
			flaws: typeof value != "object" ? undefined :
				[
					typeof value.sub == "string" || { property: "sub", type: "authly.Identifier", condition: "Merchant identifier." },
					typeof value.iss == "string" || { property: "iss", type: "string", condition: "Key issuer." },
					typeof value.aud == "string" || { property: "aud", type: `"public" | "private"`, condition: "Key audience." },
					typeof value.iat == "number" || { property: "iat", type: "number", condition: "Issued timestamp." },
					typeof value.name == "string" || { property: "name", type: "string" },
					value.user == undefined || typeof value.user == "string" || { property: "user", type: "string | undefined" },
					typeof value.url == "string" || { property: "url", type: "string" },
					value.logotype == undefined || typeof value.logotype == "string" || { property: "logotype", type: "string | undefined" },
					value.terms == undefined || typeof value.terms == "string" || { property: "terms", type: "string | undefined" },
					value.currency == undefined || isoly.Currency.is(value.currency) || { property: "currency", type: "isoly.Currency | undefined" },
					...(Configuration.flaw(value).flaws ?? []),
				].filter(gracely.Flaw.is) as gracely.Flaw[],
		}
	}
	export async function upgrade(key: Key | model.Merchant.V1.Key | undefined, inner?: card.Merchant.Configuration | undefined): Promise<Key | undefined> {
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
			if (typeof key.option.card == "string" || inner) {
				const unpacked: authly.Payload | undefined = typeof key.option.card == "string"
					? result.aud == "public"
					? await authly.Verifier.create("public").verify(key.option.card)
					: result.aud == "private"
					? await authly.Verifier.create("private").verify(key.option.card)
					: undefined
					: undefined
				const similar = unpacked && card.Merchant.Configuration.KeyInfo.is(unpacked) && card.Merchant.Configuration.is(inner) &&
					inner.url == (unpacked as any).iss &&
					inner.id == (unpacked as any).sub &&
					inner.country == unpacked.country &&
					inner.mid == unpacked.mid &&
					inner.mcc == unpacked.mcc
				result = similar && typeof key.option.card == "string" && card.Merchant.Configuration.is(inner)
					?	{
						...result,
						card: {
							url: inner.url,
							id: inner.id,
							country: inner.country,
							acquirer: inner.acquirer,
							mid: inner.mid,
							mcc: inner.mcc,
							emv3d: inner.emv3d,
						},
						url: inner.url
					}
					: undefined
			}
			if (result && key.option.email)
				result = model.Merchant.Configuration.Email.is(key.option.email) ? { ...result, email: key.option.email } : undefined
			if (result && key.option.mash)
				result = model.Merchant.Configuration.Mash.is(key.option.mash) ? { ...result, mash: key.option.mash } : undefined
			if (result && key.option.sms)
				result = model.Merchant.Configuration.Sms.is(key.option.sms) ? { ...result, sms: key.option.sms } : undefined
			if (result && key.option.currency)
				result = isoly.Currency.is(key.option.currency) ? { ...result, currency: key.option.currency } : undefined
		}
		return result
	}
	// tslint:disable: no-shadowed-variable
	export type KeyInfo = KeyKeyInfo
	export namespace KeyInfo {
		export const is = KeyKeyInfo.is
		export const flaw = KeyKeyInfo.flaw
		export const unpack = KeyKeyInfo.unpack
		export const upgrade = KeyKeyInfo.upgrade
	}
}
