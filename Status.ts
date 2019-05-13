import { Event } from "./Event"

export type Status =
	"ordered" |
	"charged" |
	"cancelled" |
	"refunded" |
	"paid"

export namespace Status {
	export function is(value: any | Status): value is Status {
		return typeof(value) == "object" &&
		(typeof(value.status) == "string" || value.status == undefined) &&
		value.status
	}
	export function change(from: Status, event: Event.Type): Status | undefined {
		let result: Status | undefined
		switch (event) {
			case "cancel":
				result = from == "ordered" ? "cancelled" : undefined
				break
			case "charge":
				result = from == "ordered" ? "charged" : undefined
				break
			case "refund":
				result = from == "charged" ? "refunded" : undefined
				break
			case "pay":
				result = from == "charged" ? "paid" : undefined
				break
		}
		return result
	}
}
