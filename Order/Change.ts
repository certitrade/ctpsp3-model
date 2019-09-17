import * as authly from "authly"
import { Event } from "../Event"

export interface Change {
	id: authly.Identifier
	payment?: authly.Token
	event: Event.Creatable[]
}

export namespace Change {
	export function is(value: any | Change): value is Change {
		return typeof(value) == "object" &&
			authly.Identifier.is(value.id) &&
			(value.payment == undefined || authly.Token.is(value.payment)) &&
			Array.isArray(value.event) && value.event.every(Event.Creatable.is)
	}
}
