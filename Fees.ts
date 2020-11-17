import { Event } from "./Event"
import * as isoly from "isoly"
export type Fees = {
	[status in Event.Type]?: [number, number] //[Absolute,Relative]
} & { currency?: isoly.Currency }

export namespace Fees {
	export function is(value: any | Fees): value is Fees {
		return (
			typeof value == "object" &&
			(value.currency == undefined || isoly.Currency.is(value.currency)) &&
			Event.types.every(
				event =>
					value[event] == undefined ||
					(value[event].length == 2 && value[event].every(element => typeof element == "number"))
			)
		)
	}
	export function calculateTotal(fees: Fees, eventList: Event[], gross: number): number {
		return eventList.reduce((r, c) => (r = r + (fees[c.type] ? gross * fees[c.type][1] + fees[c.type][0] : 0)), 0)
	}
}
