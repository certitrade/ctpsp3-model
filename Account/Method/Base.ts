import * as gracely from "gracely"
import * as isoly from "isoly"

export interface Base {
	type: string
	created: isoly.DateTime
}

export namespace Base {
	export function is(value: Base | any): value is Base {
		return typeof value == "object" &&
			isoly.DateTime.is(value.created)
	}
	export function flaw(value: Base | any): gracely.Flaw {
		return {
			type: "model.Account.Base",
			flaws: typeof value != "object" ? undefined :
				[
					(value.created == undefined || isoly.DateTime.is(value.type)) || { property: "created", type: "isoly.DateTime" },
				].filter(gracely.Flaw.is) as gracely.Flaw[],
		}
	}
}
