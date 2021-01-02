import { CreatableBase } from "../CreatableBase"
import { Method } from "./Method"

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
			(value.method == "link" ? value.contact == undefined : typeof value.contact == "string") &&
			(value.message == undefined || typeof value.message == "string") &&
			CreatableBase.is(value)
		)
	}
}
