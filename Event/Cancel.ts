import * as isoly from "isoly"
import { Base } from "./Base"
import { Item } from "../Item"

export interface Cancel extends Base {
	type: "cancel"
	items: number | Item | Item[]
}

export namespace Cancel {
	export function is(value: Cancel | any): value is Cancel {
		return typeof(value) == "object" &&
			value.type == "cancel" &&
			isoly.DateTime.is(value.date) &&
			Item.canBe(value.item)
	}
}
