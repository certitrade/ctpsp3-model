import * as isoly from "isoly"
import { Base } from "./Base"

export interface Settle extends Base {
	type: "settle"
	period: {
		start: isoly.DateTime
		end: isoly.DateTime
	}
	payout: isoly.DateTime
	amount: {
		gross: number
		net: number
	}
	fee: number
	currency: isoly.Currency
	descriptor?: string
	reference?: string
	settlementType: "authorization" | "capture" | "refund" | "credit" | "void"
}

export namespace Settle {
	export function is(value: Settle | any): value is Settle {
		return (
			Base.is(value) &&
			value.type == "settle" &&
			typeof value.amount == "number" &&
			isoly.Currency.is(value.currency) &&
			typeof value.period == "object" &&
			isoly.DateTime.is(value.period.start) &&
			isoly.DateTime.is(value.period.end) &&
			isoly.DateTime.is(value.payout) &&
			typeof value.amount == "object" &&
			typeof value.amount.gross == "number" &&
			typeof value.amount.net == "number" &&
			typeof value.fee == "number" &&
			isoly.Currency.is(value.currency) &&
			(value.descriptor == undefined || typeof value.descriptor == "string") &&
			(value.reference == undefined || typeof value.reference == "string") &&
			["authorization", "capture", "refund", "credit", "void"].some(type => type == value.settlementType)
		)
	}
}
