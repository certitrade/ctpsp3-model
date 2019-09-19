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
		return Creatable.is(value) &&
			authly.Identifier.is((value as any).sub) &&
			typeof (value as any).iss == "string" &&
			KeyAudience.is((value as any).aud) &&
			typeof (value as any).iat == "number" &&
			((value as any).user == undefined || typeof (value as any).user == "string") &&
			typeof (value as any).option == "object"
	}
	export function flaw(value: any | Key): gracely.Flaw {
		return {
			type: "model.Merchant.Key",
			flaws: typeof value != "object" ? undefined :
				[
					typeof value.sub == "string" || { property: "sub", type: "authly.Identifier", condition: "Merchant identifier." },
					typeof value.iss == "string" || { property: "iss", type: "string", condition: "Key issuer." },
					KeyAudience.is((value as any).aud) || { property: "aud", type: `"private" | "public" | ["private", "public"]`, condition: "Key audience." },
					typeof value.iat == "number" || { property: "iat", type: "number", condition: "Issued timestamp." },
					value.user == undefined || typeof value.user == "string" || { property: "user", type: "string | undefined", condition: "User email for which the token is issued." },
					...Creatable.flaw(value).flaws || [],
				].filter(gracely.Flaw.is) as gracely.Flaw[],
		}
	}
	export type Audience = KeyAudience
	// tslint:disable: no-shadowed-variable
	export namespace Audience {
		export const is = KeyAudience.is
	}
}
