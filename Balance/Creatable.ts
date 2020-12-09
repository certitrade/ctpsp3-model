import * as isoly from "isoly"
import * as model from "../index"

export interface Creatable {
	currency: isoly.Currency
	limit?:
		| number
		| {
				hard?: number
				soft?: number
				margin?: number
		  }
	schedule: model.Frequency | model.Schedule
}

export namespace Creatable {
	export function is(value: any | Creatable): value is Creatable {
		return (
			typeof value == "object" &&
			isoly.Currency.is(value.currency) &&
			(value.limit == undefined ||
				typeof value.limit == "number" ||
				(typeof value.limit == "object" &&
					(value.limit.hard == undefined || typeof value.limit.hard == "number") &&
					(value.limit.soft == undefined || typeof value.limit.soft == "number") &&
					(value.limit.margin == undefined || typeof value.limit.margin == "number"))) &&
			(model.Frequency.is(value.schedule) || model.Schedule.is(value.schedule))
		)
	}
}
