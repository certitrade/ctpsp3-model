import * as authly from "authly"
import * as gracely from "gracely"

export interface Creatable {
	name: string
	option: { [name: string]: authly.Payload.Value }
}

export namespace Creatable {
	export function is(value: any | Creatable): value is Creatable {
		return typeof(value) == "object" &&
			typeof(value.name) == "string" &&
			typeof(value.option) == "object"
	}
	export function flaw(value: any | Creatable): gracely.Flaw {
		return {
			type: "model.Merchant.Creatable",
			flaws: typeof(value) != "object" ? undefined :
				[
					typeof(value.name) == "string" || { property: "name", type: "string" },
					typeof(value.option) == "object" || { property: "option", type: "object" },
				].filter(gracely.Flaw.is) as gracely.Flaw[],
		}
	}
}
