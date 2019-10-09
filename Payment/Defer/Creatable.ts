import { Item } from "../../Item"
import { Method } from "./Method"
import { CreatableBase } from "../CreatableBase"

export interface Creatable extends CreatableBase {
	type: "defer"
	method: Method
	contact: string
	message?: string
	theme?: string
}

export namespace Creatable {
	export function is(value: any | Creatable): value is Creatable {
		return typeof value == "object" &&
			value.type == "defer" &&
			Method.is(value.method) &&
			typeof value.contact == "string" &&
			(value.message == undefined || typeof value.message == "string") &&
			Item.canBe(value.items) &&
			(value.theme == undefined || typeof value.theme == "string") &&
			CreatableBase.is(value)
	}
}
