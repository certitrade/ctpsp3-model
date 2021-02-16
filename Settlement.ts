import * as isoly from "isoly"
import { Event } from "./Event"
import { Order } from "./Order"
import { Status } from "./Status"

export interface Settlement {
	reference: string
	period: {
		start: isoly.Date
		end: isoly.Date
	}
	payout?: isoly.Date
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
			isoly.Date.is(value.period.start) &&
			isoly.Date.is(value.period.end) &&
			(value.payout == undefined || isoly.Date.is(value.payout)) &&
			typeof value.gross == "number" &&
			typeof value.fee == "number" &&
			typeof value.net == "number"
		)
	}
	export function generate(orders: Order[]): Settlement[] {
		const settlements: { [key: string]: Settlement | undefined } = {}
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
							number: order.number ?? order.id,
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
		return Object.values(settlements).filter(Settlement.is)
	}
	export function summarize(
		...settlements: (Settlement | Event.Settle | undefined)[]
	): { gross: number; fee: number; net: number } {
		const result = { gross: 0, fee: 0, net: 0 }
		settlements.forEach(settlement => {
			result.gross += settlement?.gross ?? 0
			result.fee += settlement?.fee ?? 0
			result.net += settlement?.net ?? 0
		})
		return result
	}
	export function toCsv(value: Settlement | Settlement[], includeOrders = false): string {
		let result = "reference,start date,end date,payout date,gross,fee,net,currency\r\n"
		if (!Array.isArray(value)) {
			result += settlementToCsv(value)
			result += settlementOrdersToCsv(value)
		} else
			for (const settlement of value) {
				result += settlementToCsv(settlement)
				if (includeOrders)
					result += settlementOrdersToCsv(settlement)
			}
		return result
	}
	function settlementToCsv(value: Settlement): string {
		return `"${value.reference}","${value.period.start}","${value.period.end}","${value.payout ?? ""}","${
			value.gross
		}","${value.fee}","${value.net}","${value.currency}"\r\n`
	}
	function settlementOrdersToCsv(value: Settlement) {
		let result = "number,created,gross,fee,net,status\r\n"
		for (const settlementOrder of value.orders)
			result += settlementOrderToCsv(settlementOrder)
		return result
	}
	function settlementOrderToCsv(value: {
		number: string
		created: isoly.DateTime
		gross: number
		fee: number
		net: number
		status: Status[] | Order.StatusList
	}): string {
		const statusAsList = Array.isArray(value.status)
			? value.status
			: Object.entries(value.status).reduce<Status[]>((r, c) => {
					if (Status.is(c[0]) && c[1])
						r.push(c[0])
					return r
			  }, [])
		return `"${value.number}","${value.created}","${value.gross}","${value.fee}","${value.net}","${statusAsList.join(
			" "
		)}"\r\n`
	}
}
