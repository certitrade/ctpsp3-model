import * as isoly from "isoly"
import * as model from "../index"

export interface Creatable {
	number?: string
	items: number | model.Item | model.Item[]
	currency: isoly.Currency
	schedule: model.Frequency | model.Schedule
	start?: isoly.DateTime
	end?: isoly.DateTime
	callback?: string
}

export namespace Creatable {
	export function is(value: any | Creatable): value is Creatable {
		return (
			typeof value == "object" &&
			(value.number == undefined || typeof value.number == "string") &&
			(typeof value.items == "number" ||
				model.Item.is(value.items) ||
				(Array.isArray(value.items) && value.items.every((v: any) => model.Item.is(v)))) &&
			isoly.Currency.is(value.currency) &&
			(model.Frequency.is(value.schedule) || model.Schedule.is(value.schedule)) &&
			(value.start == undefined || isoly.DateTime.is(value.start)) &&
			(value.end == undefined || isoly.DateTime.is(value.end)) &&
			(value.callback == undefined || typeof value.callback == "string")
		)
	}
}
