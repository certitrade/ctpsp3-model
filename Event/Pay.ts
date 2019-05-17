import * as isoly from "isoly"
import { Base } from "./Base"
import { Item } from "../Item"

export interface Pay extends Base {
	type: "pay"
	items: number | Item | Item[]
}

export namespace Pay {
	export function is(value: Pay | any): value is Pay {
		return typeof(value) == "object" &&
			value.type == "pay" &&
			isoly.DateTime.is(value.date) &&
			Item.canBe(value.item)
	}
}
