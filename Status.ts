import { Event } from "./Event"

export type Status =
	"created" |
	"deferred" |
	"pending" |
	"denied" |
	"ordered" |
	"cancelled" |
	"charged" |
	"paid" |
	"refunded"

export namespace Status {
	export function is(value: any | Status): value is Status {
		return typeof value == "string" && (
				value == "created" ||
				value == "deferred" ||
				value == "pending" ||
				value == "denied" ||
				value == "ordered" ||
				value == "cancelled" ||
				value == "charged" ||
				value == "paid" ||
				value == "refunded"
			)
	}
	export function change(from: Status, event: Event.Type): Status | undefined {
		let result: Status | undefined
		switch (event) {
			case "defer":
				result = from == "created" || from == "pending" ? "deferred" : undefined
				break
			case "pend":
				result = from == "created" || from == "deferred" ? "pending" : undefined
				break
			case "deny":
				result = from == "created" || from == "deferred" || from == "pending" ? "denied" : undefined
				break
			case "order":
				result = from == "created" || from == "deferred" || from == "pending" ? "ordered" : undefined
				break
			case "cancel":
				result = from == "created" || from == "deferred" || from == "pending" || from == "ordered" ? "cancelled" : undefined
				break
			case "charge":
				result = from == "ordered" ? "charged" : undefined
				break
			case "pay":
				result = from == "charged" ? "paid" : undefined
				break
			case "refund":
				result = from == "charged" || from == "paid" ? "refunded" : undefined
				break
			default:
			case "fail":
				result = from
				break
		}
		return result
	}
}
