import * as isoly from "isoly"
import { Base } from "./Base"
import { Item } from "../Item"

export interface Refund extends Base {
	type: "refund"
	items: number | Item | Item[]
}

export namespace Refund {
	export function is(value: Refund | any): value is Refund {
		return typeof(value) == "object" &&
			value.type == "refund" &&
			isoly.DateTime.is(value.date) &&
			(typeof(value.item) == "number" || typeof(value.item) == "object" && (value.item instanceof Array || Item.is(value.item)))
	}
}
