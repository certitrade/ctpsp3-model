import * as authly from "authly"
import * as gracely from "gracely"
import { Configuration as MConfiguration } from "./Configuration"
import { Creatable as MCreatable } from "./Creatable"
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
	export type Configuration = MConfiguration
	export namespace Configuration {
		export const is = MConfiguration.is
		export type Creatable = MConfiguration.Creatable
		export namespace Creatable {
			export const is = MConfiguration.Creatable.is
		}
		export type Email = MConfiguration.Email
		export namespace Email {
			export const is = MConfiguration.Email.is
			export const flaw = MConfiguration.Email.flaw
		}
		export type Mash = MConfiguration.Mash
		export namespace Mash {
			export const is = MConfiguration.Mash.is
			export const flaw = MConfiguration.Mash.flaw
			export const parse = MConfiguration.Mash.parse
		}
		export type Sms = MConfiguration.Sms
		export namespace Sms {
			export const is = MConfiguration.Sms.is
			export const flaw = MConfiguration.Sms.flaw
		}
		export type Mixed = MConfiguration.Mixed
		export namespace Mixed {
			export const is = MConfiguration.Mixed.is
			export type Creatable = MConfiguration.Mixed.Creatable
			export namespace Creatable {
				export const is = MConfiguration.Mixed.Creatable.is
				export const flaw = MConfiguration.Mixed.Creatable.flaw
			}
		}
	}
	export type Creatable = MCreatable
	export namespace Creatable {
		export const is = MCreatable.is
		export const flaw = MCreatable.flaw
		export const upgrade = MCreatable.upgrade
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
