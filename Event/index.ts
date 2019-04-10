import { Type as  EventType } from "./Type"
import { Cancel as CancelEvent } from "./Cancel"
import { Charge as ChargeEvent } from "./Charge"
import { Refund as RefundEvent } from "./Refund"

export type Event = CancelEvent | ChargeEvent | RefundEvent

// tslint:disable: no-shadowed-variable
export namespace Event {
	export function is(value: any | Event) {
		return CancelEvent.is(value) ||
			ChargeEvent.is(value) ||
			RefundEvent.is(value)
	}
	export type Type = EventType
	export type Cancel = CancelEvent
	export namespace Cancel {
		export const is = CancelEvent.is
	}
	export type Charge = ChargeEvent
	export namespace Charge {
		export const is = ChargeEvent.is
	}
	export type Refund = RefundEvent
	export namespace Refund {
		export const is = RefundEvent.is
	}
}
