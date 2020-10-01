import * as isoly from "isoly"
import { Base } from "./Base"

export interface Settle extends Base {
	type: "settle"
	amount: number
	currency: isoly.Currency
	fee: {
		total: number
		sales?: number
		refunds?: number
		authorisations?: number
		credits?: number
		interchange?: number
		scheme?: number
		minimumProcessing?: number
		service?: number
		wireTransfer?: number
		chargebacks?: number
		retrievalRequests?: number
	}
	payout: {
		amount: number
		date: isoly.DateTime
		start: isoly.DateTime
		end: isoly.DateTime
		descriptor?: string
		reference?: string
	}
}

export namespace Settle {
	export function is(value: Settle | any): value is Settle {
		return (
			Base.is(value) &&
			value.type == "settle" &&
			isoly.DateTime.is(value.start) &&
			isoly.DateTime.is(value.end) &&
			isoly.Currency.is(value.currency) &&
			typeof value.amount == "number" &&
			typeof value.fee == "object" &&
			typeof value.fee.total == "number" &&
			(value.fee.sales == undefined || typeof value.fee.sales == "number") &&
			(value.fee.refunds == undefined || typeof value.fee.refunds == "number") &&
			(value.fee.authorisations == undefined || typeof value.fee.authorisations == "number") &&
			(value.fee.credits == undefined || typeof value.fee.credits == "number") &&
			(value.fee.interchange == undefined || typeof value.fee.interchange == "number") &&
			(value.fee.scheme == undefined || typeof value.fee.scheme == "number") &&
			(value.fee.minimumProcessing == undefined || typeof value.fee.minimumProcessing == "number") &&
			(value.fee.service == undefined || typeof value.fee.service == "number") &&
			(value.fee.wireTransfer == undefined || typeof value.fee.wireTransfer == "number") &&
			(value.fee.chargebacks == undefined || typeof value.fee.chargebacks == "number") &&
			(value.fee.retrievalRequests == undefined || typeof value.fee.retrievalRequests == "number") &&
			typeof value.payout == "object" &&
			typeof value.payout.amount == "number" &&
			isoly.DateTime.is(value.payout.date) &&
			(value.payout.descriptor == undefined || typeof value.payout.descriptor == "string") &&
			(value.payout.reference == undefined || typeof value.payout.reference == "string")
		)
	}
}
