import * as authly from "authly"
import * as gracely from "gracely"
import * as isoly from "isoly"
import * as card from "@cardfunc/model"
import * as model from "../../index"
import { KeyInfo as ConfigurationKeyInfo } from "../Configuration/KeyInfo"

export interface KeyInfo extends ConfigurationKeyInfo {
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

export namespace KeyInfo {
	export function is(value: any | KeyInfo): value is KeyInfo {
		return (
			typeof value == "object" &&
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
			ConfigurationKeyInfo.is(value)
		)
	}
	export function flaw(value: any | KeyInfo): gracely.Flaw {
		return {
			type: "model.Merchant.Key.KeyInfo",
			flaws:
				typeof value != "object"
					? undefined
					: ([
							typeof value.sub == "string" || {
								property: "sub",
								type: "authly.Identifier",
								condition: "Merchant identifier.",
							},
							typeof value.iss == "string" || { property: "iss", type: "string", condition: "Key issuer." },
							typeof value.aud == "string" || {
								property: "aud",
								type: `"public" | "private"`,
								condition: "Key audience.",
							},
							typeof value.iat == "number" || { property: "iat", type: "number", condition: "Issued timestamp." },
							typeof value.name == "string" || { property: "name", type: "string" },
							value.user == undefined ||
								typeof value.user == "string" || { property: "user", type: "string | undefined" },
							typeof value.url == "string" || { property: "url", type: "string" },
							value.logotype == undefined ||
								typeof value.logotype == "string" || { property: "logotype", type: "string | undefined" },
							value.terms == undefined ||
								typeof value.terms == "string" || { property: "terms", type: "string | undefined" },
							value.currency == undefined ||
								isoly.Currency.is(value.currency) || { property: "currency", type: "isoly.Currency | undefined" },
							...(ConfigurationKeyInfo.flaw(value).flaws ?? []),
					  ].filter(gracely.Flaw.is) as gracely.Flaw[]),
		}
	}
	export async function unpack(
		key: authly.Token | undefined,
		audience: "private" | "public"
	): Promise<KeyInfo | undefined> {
		let result
		if (key) {
			result = await authly.Verifier.create(audience).verify(key)
			if (model.Merchant.V1.Key.is(result))
				result = await model.Merchant.Key.KeyInfo.upgrade(result)
			if (!model.Merchant.Key.KeyInfo.is(result))
				result = undefined
		}
		return result
	}
	export async function upgrade(key: KeyInfo | model.Merchant.V1.Key | undefined): Promise<KeyInfo | undefined> {
		let result: KeyInfo | undefined
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
			if (typeof key.option.card == "string") {
				const cardInfo: authly.Payload | undefined =
					result.aud == "public"
						? await authly.Verifier.create("public").verify(key.option.card)
						: result.aud == "private"
						? await authly.Verifier.create("private").verify(key.option.card)
						: undefined
				result =
					cardInfo && card.Merchant.Configuration.KeyInfo.is(cardInfo)
						? {
								...result,
								card: {
									url: (cardInfo as any).iss,
									id: (cardInfo as any).sub,
									country: cardInfo.country,
									acquirer: cardInfo.acquirer,
									mid: cardInfo.mid,
									mcc: cardInfo.mcc,
									emv3d: cardInfo.emv3d,
								},
								url: cardInfo.url,
						  }
						: undefined
			}
			if (result && key.option.email)
				result = typeof key.option.email == "string" ? { ...result, email: key.option.email } : undefined
			if (result && key.option.mash)
				result = typeof key.option.mash == "string" ? { ...result, mash: key.option.mash } : undefined
			if (result && key.option.sms)
				result = typeof key.option.sms == "string" ? { ...result, sms: key.option.sms } : undefined
			if (result && key.option.currency)
				result = isoly.Currency.is(key.option.currency) ? { ...result, currency: key.option.currency } : undefined
		}
		return result
	}
}
