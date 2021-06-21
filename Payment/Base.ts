import * as isoly from "isoly"
import { Status } from "./Status"
import { Type } from "./Type"

export interface Base {
	type: Type
	reference?: string
	service: string
	created: isoly.DateTime
	amount: number
	currency: isoly.Currency
	descriptor?: string
	category?: "purchase" | "withdrawal"
	status: Status
}

export namespace Base {
	export function is(value: any | Base): value is Base {
		return (
			typeof value == "object" &&
			Type.is(value.type) &&
			(value.reference == undefined || typeof value.reference == "string") &&
			typeof value.service == "string" &&
			isoly.DateTime.is(value.created) &&
			typeof value.amount == "number" &&
			isoly.Currency.is(value.currency) &&
			(typeof value.descriptor == "string" || value.descriptor == undefined) &&
			Status.is(value.status)
		)
	}
	export function getCsvHeaders(): string {
		return `payment type,payment service,payment created,payment amount,payment currency`
	}
	export function toCsv(value: Base): string {
		let result = ``
		result += `"` + value.type + `",`
		result += `"` + value.service + `",`
		result += `"` + value.created + `",`
		result += value.amount + `,`
		result += `"` + value.currency + `"`
		return result
	}
}
