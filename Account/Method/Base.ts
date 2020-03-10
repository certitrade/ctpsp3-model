import * as isoly from "isoly"
import * as authly from "authly"
import * as gracely from "gracely"
import { Type } from "./Type"

export interface Base {
	type: Type
	created?: isoly.DateTime
	token: authly.Token
}

export namespace Base {
	export function is(value: Base | any): value is Base {
		return typeof value == "object" &&
			Type.is(value.type) &&
			(value.created == undefined || isoly.DateTime.is(value.created)) &&
			authly.Token.is(value.token)
	}
	export function flaw(value: Base | any): gracely.Flaw {
		return {
			type: "model.Account.Base",
			flaws: typeof value != "object" ? undefined :
				[
					Type.is(value.type) || { property: "type", type: "Account.Method.Type" },
					(value.created == undefined || isoly.DateTime.is(value.created)) || { property: "created", type: "isoly.DateTime" },
					authly.Token.is(value.token) || { property: "token", type: "authly.Token" },
				].filter(gracely.Flaw.is) as gracely.Flaw[],
		}
	}
}
