import { Event } from "./Event"

export type Status =
	"ordered" |
	"cancelled" |
	"charged" |
	"paid" |
	"refunded"

export namespace Status {
	export function is(value: any | Status): value is Status {
		return typeof(value) == "object" &&
		(typeof(value.status) == "string" || value.status == undefined)
	}
	export function change(from: Status | undefined, event: Event.Type): Status | undefined {
		let result: Status | undefined
		switch (event) {
			case "order":
				result = from == undefined ? "ordered" : undefined
				break
			case "cancel":
				result = from == "ordered" ? "cancelled" : undefined
				break
			case "charge":
				result = from == "ordered" ? "charged" : undefined
				break
			case "pay":
				result = from == "charged" ? "paid" : undefined
				break
			case "refund":
				result = from == "charged" ? "refunded" : undefined
				break
		}
		return result
	}
}
