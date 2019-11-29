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
	"refunded" |
	"synchronized"

export namespace Status {
	export const types = ["created", "deferred", "pending", "denied", "ordered", "cancelled", "charged", "paid", "refunded", "synchronized"]
	export function is(value: any | Status): value is Status {
		return typeof value == "string" && types.some(t => t == value)
	}
	export function change(from: Status, event: Event.Type): Status | undefined {
		let result: Status | undefined
		switch (event) {
			case "defer":
				result = from == "synchronized" || from == "created" || from == "pending" ? "deferred" : undefined
				break
			case "pend":
				result = from == "synchronized" || from == "created" || from == "deferred" ? "pending" : undefined
				break
			case "deny":
				result = from == "synchronized" || from == "created" || from == "deferred" || from == "pending" ? "denied" : undefined
				break
			case "order":
				result = from == "synchronized" || from == "created" || from == "deferred" || from == "pending" ? "ordered" : undefined
				break
			case "cancel":
				result = from == "synchronized" || from == "created" || from == "deferred" || from == "pending" || from == "ordered" ? "cancelled" : undefined
				break
			case "charge":
				result = from == "synchronized" || from == "ordered" ? "charged" : undefined
				break
			case "pay":
				result = from == "synchronized" || from == "charged" ? "paid" : undefined
				break
			case "refund":
				result = from == "synchronized" || from == "charged" || from == "paid" ? "refunded" : undefined
				break
			case "synchronize":
				result = "synchronized"
				break
			default:
			case "fail":
				result = from
				break
		}
		return result
	}
	export function toEvent(status: Status): Event.Type {
		let result: Event.Type
		switch (status) {
			default: case "created": result = "fail"; break
			case "deferred": result = "defer"; break
			case "pending": result = "pend"; break
			case "denied": result = "deny"; break
			case "ordered": result = "order"; break
			case "cancelled": result = "cancel"; break
			case "charged": result = "charge"; break
			case "paid": result = "pay"; break
			case "refunded": result = "refund"; break
			case "synchronized": result = "synchronize"; break
		}
		return result
	}
}
