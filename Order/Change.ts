import * as authly from "authly"
import { Event } from "../Event"

export interface Change {
	id: authly.Identifier
	event: Event.Creatable[]
}

export namespace Change {
	export function is(value: any | Change): value is Change {
		return (
			typeof value == "object" &&
			authly.Identifier.is(value.id) &&
			Array.isArray(value.event) &&
			value.event.every(Event.Creatable.is)
		)
	}
	export function isArray(value: any | Change[]): value is Change[] {
		return Array.isArray(value) && value.every(is)
	}
}
