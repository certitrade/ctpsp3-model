import * as isoly from "isoly"
import { Item } from "../Item"
import { Type } from "./Type"

export interface Creatable {
	type: Type
	date: isoly.DateTime
	items?: number | Item | Item[]
}
export namespace Creatable {
	export function is(value: any | Creatable): value is Creatable {
		return typeof(value) == "object" &&
			Type.is(value.type) &&
			(value.items == undefined || Item.canBe(value.items))
	}
}
