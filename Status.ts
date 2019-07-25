import { Event } from "./Event"

export type Status =
	"created" |
	"ordered" |
	"cancelled" |
	"charged" |
	"paid" |
	"refunded"

export namespace Status {
	export function is(value: any | Status): value is Status {
		return typeof(value) == "string" && (
				value == "created" ||
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
			case "order":
				result = from == "created" ? "ordered" : undefined
				break
			case "cancel":
				result = from == "created" || from == "ordered" ? "cancelled" : undefined
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
