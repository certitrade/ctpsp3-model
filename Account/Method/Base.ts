import * as gracely from "gracely"
import * as isoly from "isoly"
import { Type } from "./Type"

export interface Base {
	type: Type
	created?: isoly.DateTime
}

export namespace Base {
	export function is(value: Base | any): value is Base {
		return typeof value == "object" &&
			Type.is(value.type) &&
			(value.created == undefined || isoly.DateTime.is(value.created))
	}
	export function flaw(value: Base | any): gracely.Flaw {
		return {
			type: "model.Account.Base",
			flaws: typeof value != "object" ? undefined :
				[
					Type.is(value.type) || { property: "type", type: "@cardfunc/model/Account/Method/Type" },
					(value.created == undefined || isoly.DateTime.is(value.created)) || { property: "created", type: "isoly.DateTime" },
				].filter(gracely.Flaw.is) as gracely.Flaw[],
		}
	}
}
