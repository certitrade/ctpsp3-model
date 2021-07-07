import * as isoly from "isoly"
import { Frequency } from "../Frequency"
import { Item } from "../Item"
import { Schedule } from "../Schedule"

export interface Creatable {
	number?: string
	items: number | Item | Item[]
	currency: isoly.Currency
	schedule: Frequency | Schedule
	start?: isoly.Date
	end?: isoly.Date
	callback?: string
}

export namespace Creatable {
	export function is(value: any | Creatable): value is Creatable {
		return (
			typeof value == "object" &&
			(value.number == undefined || typeof value.number == "string") &&
			(typeof value.items == "number" ||
				Item.is(value.items) ||
				(Array.isArray(value.items) && value.items.every((v: any) => Item.is(v)))) &&
			isoly.Currency.is(value.currency) &&
			(Frequency.is(value.schedule) || Schedule.is(value.schedule)) &&
			(value.start == undefined || isoly.Date.is(value.start)) &&
			(value.end == undefined || isoly.Date.is(value.end)) &&
			(value.callback == undefined || typeof value.callback == "string")
		)
	}
}
