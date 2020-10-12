import * as isoly from "isoly"
import { Base } from "./Base"

export interface Settle extends Base {
	type: "settle"
	amount: number
	currency: isoly.Currency
	settlement: {
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
		type: "authorization" | "capture" | "refund" | "credit" | "void"
	}
}

export namespace Settle {
	export function is(value: Settle | any): value is Settle {
		return (
			Base.is(value) &&
			value.type == "settle" &&
			typeof value.amount == "number" &&
			isoly.Currency.is(value.currency) &&
			typeof value.settlement == "object" &&
			typeof value.settlement.period == "object" &&
			isoly.DateTime.is(value.settlement.period.start) &&
			isoly.DateTime.is(value.settlement.period.end) &&
			isoly.DateTime.is(value.settlement.payout) &&
			typeof value.settlement.amount == "object" &&
			typeof value.settlement.amount.gross == "number" &&
			typeof value.settlement.amount.net == "number" &&
			typeof value.settlement.fee == "number" &&
			isoly.Currency.is(value.settlement.currency) &&
			(value.settlement.descriptor == undefined || typeof value.settlement.descriptor == "string") &&
			(value.settlement.reference == undefined || typeof value.settlement.reference == "string") &&
			["authorization", "capture", "refund", "credit", "void"].some(type => type == value.settlement.type)
		)
	}
}
