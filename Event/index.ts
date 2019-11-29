import * as isoly from "isoly"
import { Creatable as EventCreatable } from "./Creatable"
import { Type as EventType, types as eventTypes } from "./Type"
import { Defer as DeferEvent } from "./Defer"
import { Pend as PendEvent } from "./Pend"
import { Deny as DenyEvent } from "./Deny"
import { Order as OrderEvent } from "./Order"
import { Cancel as CancelEvent } from "./Cancel"
import { Charge as ChargeEvent } from "./Charge"
import { Pay as PayEvent } from "./Pay"
import { Refund as RefundEvent } from "./Refund"
import { Fail as FailEvent } from "./Fail"
import { Synchronize as SynchronizeEvent } from "./Synchronize"

export type Event =
	DeferEvent |
	PendEvent |
	DenyEvent |
	OrderEvent |
	CancelEvent |
	ChargeEvent |
	PayEvent |
	RefundEvent |
	FailEvent |
	SynchronizeEvent

// tslint:disable: no-shadowed-variable
export namespace Event {
	export function is(value: any | Event): value is Event {
		return DeferEvent.is(value) ||
			PendEvent.is(value) ||
			DenyEvent.is(value) ||
			OrderEvent.is(value) ||
			CancelEvent.is(value) ||
			ChargeEvent.is(value) ||
			PayEvent.is(value) ||
			RefundEvent.is(value) ||
			FailEvent.is(value) ||
			SynchronizeEvent.is(value)
	}
	export function create(event: EventCreatable, date?: isoly.DateTime): Event {
		return { ...event, date: date || isoly.DateTime.now() }
	}
	export type Creatable = EventCreatable
	export namespace Creatable {
		export const is = EventCreatable.is
	}
	export type Type = EventType
	export const types = eventTypes
	export namespace Type {
		export const is = EventType.is
	}
	export type Defer = DeferEvent
	export namespace Defer {
		export const is = DeferEvent.is
	}
	export type Pend = PendEvent
	export namespace Pend {
		export const is = PendEvent.is
	}
	export type Deny = DenyEvent
	export namespace Deny {
		export const is = DenyEvent.is
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
	export type Fail = FailEvent
	export namespace Fail {
		export const is = FailEvent.is
	}
	export type Synchronize = SynchronizeEvent
	export namespace Synchronize {
		export const is = SynchronizeEvent.is
	}
}
