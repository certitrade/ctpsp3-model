import * as isoly from "isoly"
import { Event } from "./Event"
import { Status } from "./Status"
import { Order } from "./Order"

export interface Settlement {
	reference: string
	period: {
		start: isoly.DateTime
		end: isoly.DateTime
	}
	payout: isoly.DateTime
	gross: number
	fee: number
	net: number
	currency: isoly.Currency
	orders: {
		number: string
		created: isoly.DateTime
		gross: number
		fee: number
		net: number
		status: Status[] | Order.StatusList
	}[]
}

export namespace Settlement {
	export function is(value: Settlement | any): value is Settlement {
		return (
			typeof value == "object" &&
			typeof value.reference == "string" &&
			typeof value.period == "object" &&
			isoly.DateTime.is(value.period.start) &&
			isoly.DateTime.is(value.period.end) &&
			isoly.DateTime.is(value.payout) &&
			typeof value.gross == "number" &&
			typeof value.fee == "number" &&
			typeof value.net == "number"
		)
	}
	export function generate(orders: Order[]): Settlement[] {
		const settlements: { [key: string]: Settlement } = {}
		for (const order of orders) {
			const settles = order.event?.filter(Event.Settle.is) ?? []
			for (const settle of settles) {
				settlements[settle.reference] = {
					reference: settle.reference,
					period: settle.period,
					payout: settle.payout,
					...summarize(settle, settlements[settle.reference]),
					currency: settle.currency,
					orders: [
						...(settlements[settle.reference]?.orders ?? []),
						{
							number: order.id,
							created: order.created,
							gross: settle.gross,
							fee: settle.fee,
							net: settle.net,
							status: order.status ?? [],
						},
					],
				}
			}
		}
		return Object.values(settlements)
	}
	export function summarize(
		...settlements: (Settlement | Event.Settle)[]
	): { gross: number; fee: number; net: number } {
		const result = { gross: 0, fee: 0, net: 0 }
		settlements.forEach(settlement => {
			result.gross += settlement?.gross ?? 0
			result.fee += settlement?.fee ?? 0
			result.net += settlement?.net ?? 0
		})
		return result
	}
}
