import * as gracely from "gracely"
import * as authly from "authly"
import { Creatable as MerchantCreatable } from "./Creatable"
import { Key as MerchantKey } from "./Key"

export interface Merchant {
	id: authly.Identifier
	name: string
	key: {
		private: authly.Token,
		public?: authly.Token,
	}
	terms?: string
	logotype?: string
}
// tslint:disable: no-shadowed-variable
export namespace Merchant {
	export function is(value: any | Merchant): value is Merchant {
		return typeof value == "object" &&
			typeof value.id == "string" &&
			typeof value.name == "string" &&
			typeof value.key == "object" &&
			authly.Token.is(value.key.private) &&
			(value.key.public == undefined || authly.Token.is(value.key.public)) &&
			(value.terms == undefined || typeof value.terms == "string") &&
			(value.logotype == undefined || typeof value.logotype == "string")
	}
	export function flaw(value: any | Merchant): gracely.Flaw {
		return {
			type: "model.Merchant",
			flaws: typeof value != "object" ? undefined :
				[
					authly.Identifier.is(value.id) || { property: "id", type: "authly.Identifier" },
					typeof value.name == "string" || { property: "name", type: "string" },
					typeof value.key == "object" && authly.Token.is(value.key.public) &&	authly.Token.is(value.key.private) || { property: "key", type: "{ public: authly.Token, private: authly.Token }" },
					value.terms == undefined || typeof value.terms == "string" || { property: "terms", type: "string | undefined" },
					value.logotype == undefined || typeof value.logotype == "string" || { property: "logotype", type: "string | undefined" },
				].filter(gracely.Flaw.is) as gracely.Flaw[],
		}
	}
	export type Creatable = MerchantCreatable
	export namespace Creatable {
		export const is = MerchantCreatable.is
		export const flaw = MerchantCreatable.flaw
	}
	export type Key = MerchantKey
	export namespace Key {
		export const is = MerchantKey.is
		export const flaw = MerchantKey.flaw
		export const unpack = MerchantKey.unpack
		export type Audience = MerchantKey.Audience
		// tslint:disable: no-shadowed-variable
		export namespace Audience {
			export const is = MerchantKey.Audience.is
		}
	}
}
