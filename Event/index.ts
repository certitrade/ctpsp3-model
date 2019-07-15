import { Type as  EventType } from "./Type"
import { Defer as DeferEvent } from "./Defer"
import { Order as OrderEvent } from "./Order"
import { Cancel as CancelEvent } from "./Cancel"
import { Charge as ChargeEvent } from "./Charge"
import { Pay as PayEvent } from "./Pay"
import { Refund as RefundEvent } from "./Refund"

export type Event =
	DeferEvent |
	OrderEvent |
	CancelEvent |
	ChargeEvent |
	PayEvent |
	RefundEvent

// tslint:disable: no-shadowed-variable
export namespace Event {
	export function is(value: any | Event): value is Event {
		return OrderEvent.is(value) ||
			CancelEvent.is(value) ||
			ChargeEvent.is(value) ||
			PayEvent.is(value) ||
			RefundEvent.is(value)
	}
	export type Type = EventType
	export type Defer = DeferEvent
	export namespace Defer {
		export const is = DeferEvent.is
	}
	export type Order = OrderEvent
	export namespace Order {
		export const is = OrderEvent.is
	}
	export type Cancel = CancelEvent
	export namespace Cancel {
		export const is = CancelEvent.is
	}
	export type Charge = ChargeEvent
	export namespace Charge {
		export const is = ChargeEvent.is
	}
	export type Pay = PayEvent
	export namespace Pay {
		export const is = PayEvent.is
	}
	export type Refund = RefundEvent
	export namespace Refund {
		export const is = RefundEvent.is
	}
}
