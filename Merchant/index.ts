import * as authly from "authly"
import * as gracely from "gracely"
import { Configuration as MerchantConfiguration } from "./Configuration"
import { Creatable as MerchantCreatable } from "./Creatable"
import { Key as MerchantKey } from "./Key"
import * as MerchantV1 from "./V1"

export interface Merchant {
	id: authly.Identifier
	name: string
	key: {
		private: authly.Token,
		public?: authly.Token,
	}
	logotype?: string
	terms?: string
}

// tslint:disable: no-shadowed-variable
export namespace Merchant {
	export function is(value: any | Merchant): value is Merchant {
		return typeof value == "object" &&
			authly.Identifier.is((value as any).id) &&
			typeof value.name == "string" &&
			typeof value.key == "object" &&
			authly.Token.is(value.key.private) &&
			(value.key.public == undefined || authly.Token.is(value.key.public)) &&
			(value.logotype == undefined || typeof value.logotype == "string") &&
			(value.terms == undefined || typeof value.terms == "string")
	}
	export function flaw(value: any | Merchant): gracely.Flaw {
		return {
			type: "model.Merchant",
			flaws: typeof value != "object" ? undefined :
				[
					authly.Identifier.is(value.id, 8) || { property: "id", type: "authly.Identifier", condition: "length == 8" },
					typeof value.name == "string" || { property: "name", type: "string" },
					typeof value.key == "object" && (value.key.public == undefined || authly.Token.is(value.key.public)) && authly.Token.is(value.key.private) || { property: "key", type: "{ public: authly.Token | undefined, private: authly.Token }" },
					value.terms == undefined || typeof value.terms == "string" || { property: "terms", type: "string | undefined" },
					value.logotype == undefined || typeof value.logotype == "string" || { property: "logotype", type: "string | undefined" },
				].filter(gracely.Flaw.is) as gracely.Flaw[],
		}
	}
	export type Configuration = MerchantConfiguration
	export namespace Configuration {
		export const is = MerchantConfiguration.is
		export type Creatable = MerchantConfiguration.Creatable
		export namespace Creatable {
			export const is = MerchantConfiguration.Creatable.is
		}
		export type Email = MerchantConfiguration.Email
		export namespace Email {
			export const is = MerchantConfiguration.Email.is
			export const flaw = MerchantConfiguration.Email.flaw
		}
		export type Mash = MerchantConfiguration.Mash
		export namespace Mash {
			export const is = MerchantConfiguration.Mash.is
			export const flaw = MerchantConfiguration.Mash.flaw
			export const parse = MerchantConfiguration.Mash.parse
		}
		export type Sms = MerchantConfiguration.Sms
		export namespace Sms {
			export const is = MerchantConfiguration.Sms.is
			export const flaw = MerchantConfiguration.Sms.flaw
		}
		export type Mixed = MerchantConfiguration.Mixed
		export namespace Mixed {
			export const is = MerchantConfiguration.Mixed.is
			export type Creatable = MerchantConfiguration.Mixed.Creatable
			export namespace Creatable {
				export const is = MerchantConfiguration.Mixed.Creatable.is
				export const flaw = MerchantConfiguration.Mixed.Creatable.flaw
			}
		}
	}
	export type Creatable = MerchantCreatable
	export namespace Creatable {
		export const is = MerchantCreatable.is
		export const flaw = MerchantCreatable.flaw
		export const upgrade = MerchantCreatable.upgrade
	}
	export type Key = MerchantKey
	export namespace Key {
		export const is = MerchantKey.is
		export const flaw = MerchantKey.flaw
		export const unpack = MerchantKey.unpack
		export const upgrade = MerchantKey.upgrade
	}
	export namespace V1 {
		export type Creatable = MerchantV1.Creatable
		export namespace Creatable {
			export const is = MerchantV1.Creatable.is
			export const flaw = MerchantV1.Creatable.flaw
		}
		export type Key = MerchantV1.Key
		export namespace Key {
			export const is = MerchantV1.Key.is
			export const flaw = MerchantV1.Key.flaw
			export type Audience = MerchantV1.Key.Audience
			export namespace Audience {
				export const is = MerchantV1.Key.Audience.is
			}
		}
	}
}
