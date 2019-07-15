import * as isoly from "isoly"
import { Type } from "./Type"
import { Item } from "../Item"

export interface Base {
	type: Type
	date: isoly.DateTime
	items?: number | Item | Item[]
}
export namespace Base {
	export function is(value: Base | any): value is Base {
		return typeof(value) == "object" &&
			isoly.DateTime.is(value.date) &&
			(value.item == undefined || Item.canBe(value.item))
	}
}
