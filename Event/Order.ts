import * as isoly from "isoly"
import { Base } from "./Base"
import { Item } from "../Item"

export interface Order extends Base {
	type: "order"
	items: number | Item | Item[]
}

export namespace Order  {
	export function is(value: Order | any): value is Order {
		return typeof(value) == "object" &&
			value.type == "order" &&
			isoly.DateTime.is(value.date) &&
			Item.canBe(value.item)
	}
}
