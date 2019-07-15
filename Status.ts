import { Event } from "./Event"

export type Status =
	"deferred" |
	"ordered" |
	"cancelled" |
	"charged" |
	"paid" |
	"refunded"

export namespace Status {
	export function is(value: any | Status): value is Status {
		return typeof(value) == "string" && (
				value == "deferred" ||
				value == "ordered" ||
				value == "cancelled" ||
				value == "charged" ||
				value == "paid" ||
				value == "refunded"
			)
	}
	export function change(from: Status | undefined, event: Event.Type): Status | undefined {
		let result: Status | undefined
		switch (event) {
			case "defer":
				result = from == undefined ? "deferred" : undefined
				break
			case "order":
				result = from == undefined || from == "deferred" ? "ordered" : undefined
				break
			case "cancel":
				result = from == undefined || from == "deferred" || from == "ordered" ? "cancelled" : undefined
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
		}
		return result
	}
}
