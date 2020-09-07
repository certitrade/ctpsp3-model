import { Method } from "./Method"
import { CreatableBase } from "../CreatableBase"

export interface Creatable extends CreatableBase {
	type: "defer"
	method: Method
	contact?: string
	message?: string
}

export namespace Creatable {
	export function is(value: any | Creatable): value is Creatable {
		return (
			typeof value == "object" &&
			value.type == "defer" &&
			Method.is(value.method) &&
			((value.contact == undefined && value.method == "link") ||
				(typeof value.contact == "string" && value.method != "link")) &&
			(value.message == undefined || typeof value.message == "string") &&
			CreatableBase.is(value)
		)
	}
}
