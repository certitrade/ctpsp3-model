import * as gracely from "gracely"
import * as authly from "authly"
import { CreatableBase } from "../CreatableBase"

export interface Creatable extends CreatableBase {
	type: "preauthorization"
	token: authly.Token
}

export namespace Creatable {
	export function is(value: any | Creatable): value is Creatable {
		return typeof value == "object" &&
			value.type == "preauthorization" &&
			authly.Token.is(value.token) &&
			CreatableBase.is(value)
	}
	export function flaw(value: any | Creatable): gracely.Flaw {
		return {
			type: "model.Payment.PreAuthorization.Creatable",
			flaws: typeof value != "object" ? undefined :
				[
					value.type == "preauthorization" || { property: "type", type: '"preauthorization"' },
					authly.Token.is(value.token) || { property: "token", type: "authly.Token" },
					CreatableBase.is(value) || { ...CreatableBase.flaw(value).flaws },
				].filter(gracely.Flaw.is) as gracely.Flaw[],
		}
	}
}
