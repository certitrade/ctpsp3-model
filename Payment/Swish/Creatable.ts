import * as isoly from "isoly"
import * as gracely from "gracely"
import * as authly from "authly"
import * as card from "@cardfunc/model"
import { CreatableBase } from "../CreatableBase"

export interface Creatable extends CreatableBase {
	type: "swish"
}

export namespace Creatable {
	export function is(value: any | Creatable): value is Creatable {
		return typeof value == "object" &&
			value.type == "swish" &&
			CreatableBase.is(value)
	}
	export function flaw(value: any | Creatable): gracely.Flaw {
		return {
			type: "model.Payment.Swish.Creatable",
			flaws: typeof value != "object" ? undefined :
				[
					value.type == "swish" || { property: "type", type: '"swish"' },
					CreatableBase.is(value) || { ...CreatableBase.flaw(value).flaws },
				].filter(gracely.Flaw.is) as gracely.Flaw[],
		}
	}
}
