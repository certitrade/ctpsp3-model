import * as gracely from "gracely"
import * as authly from "authly"
import { Creatable as MerchantCreatable } from "./Creatable"
import { Key as MerchantKey } from "./Key"

export interface Merchant extends MerchantCreatable {
	id: authly.Identifier
	key: {
		public: authly.Token,
		private: authly.Token,
	}
}
// tslint:disable: no-shadowed-variable
export namespace Merchant {
	export function is(value: any | Merchant): value is Merchant {
		return typeof(value) == "object" &&
			typeof(value.id) == "string" &&
			typeof(value.name) == "string" &&
			typeof(value.key) == "object" &&
			authly.Token.is(value.key.public) &&
			authly.Token.is(value.key.private) &&
			MerchantCreatable.is(value)
	}
	export function flaw(value: any | Merchant): gracely.Flaw {
		return {
			type: "model.Merchant",
			flaws: typeof(value) != "object" ? undefined :
				[
					authly.Identifier.is((value as any).id) || { property: "id", type: "authly.Identifier" },
					typeof(value.key) == "object" && authly.Token.is(value.key.public) &&	authly.Token.is(value.key.private) || { property: "key", type: "{ public: authly.Token, private: authly.Token }" },
					...MerchantCreatable.flaw(value).flaws || [],
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
	}
}
