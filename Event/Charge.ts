import * as isoly from "isoly"
import { Base } from "./Base"
import { Item } from "../Item"

export interface Charge extends Base {
	type: "charge"
	items: number | Item | Item[]
}

export namespace Charge {
	export function is(value: Charge | any): value is Charge {
		return typeof(value) == "object" &&
			value.type == "charge" &&
			isoly.DateTime.is(value.date) &&
			Item.canBe(value.items)
	}
}
