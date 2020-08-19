import * as gracely from "gracely"
import * as authly from "authly"
import { Audience as KeyAudience } from "./Audience"
import { Creatable } from "../Creatable"

export interface Key extends Creatable, authly.Payload {
	sub: string
	iss: string
	aud: KeyAudience
	iat: number
	user?: string
	option: authly.Payload.Data
}

export namespace Key {
	export function is(value: Key | any): value is Key {
		return (
			typeof value == "object" &&
			authly.Identifier.is(value.sub, 8) &&
			typeof value.iss == "string" &&
			KeyAudience.is(value.aud) &&
			typeof value.iat == "number" &&
			(value.user == undefined || typeof value.user == "string") &&
			typeof value.option == "object" &&
			Creatable.is({ ...value, id: value.sub })
		)
	}
	export function flaw(value: any | Key): gracely.Flaw {
		return {
			type: "model.Merchant.Key",
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
							KeyAudience.is((value as any).aud) || {
								property: "aud",
								type: `"private" | "public" | ["private", "public"]`,
								condition: "Key audience.",
							},
							typeof value.iat == "number" || { property: "iat", type: "number", condition: "Issued timestamp." },
							value.user == undefined ||
								typeof value.user == "string" || {
									property: "user",
									type: "string | undefined",
									condition: "User email for which the token is issued.",
								},
							...(Creatable.flaw(value).flaws || []),
					  ].filter(gracely.Flaw.is) as gracely.Flaw[]),
		}
	}
	export async function unpack(key: authly.Token): Promise<Key | undefined> {
		const payload: authly.Payload | undefined = await authly.Verifier.create("public").verify(key)
		return is(payload) ? payload : undefined
	}
	export type Audience = KeyAudience
	export namespace Audience {
		export const is = KeyAudience.is
	}
}
