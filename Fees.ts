import * as isoly from "isoly"
import { Event } from "./Event"
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
					(value[event].length == 2 && typeof value[0] == "number" && typeof value[1] == "number")
			)
		)
	}
	export function calculateTotal(fees: Fees, eventList: (Event & { gross: number })[]): number {
		return eventList.reduce((r, c) => {
			const fee = fees[c.type] ?? [0, 0]
			return (r = r + (c.gross * fee[1] + fee[0]))
		}, 0)
	}
}
