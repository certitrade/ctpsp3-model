import { Type as  EventType } from "./Type"
import { Charge as ChargeEvent } from "./Charge"

export type Event = ChargeEvent

// tslint:disable: no-shadowed-variable
export namespace Event {
	export function is(value: any | Event) {
		return ChargeEvent.is(value)
	}
	export type Type = EventType
	export type Charge = ChargeEvent
	export namespace Charge {
		export const is = ChargeEvent.is
	}
}
