import * as isoly from "isoly"
import * as authly from "authly"
import * as servly from "servly"
import { Creatable as EntryCreatable } from "./Creatable"

export interface Entry extends EntryCreatable, servly.Log.Entry {
	id: authly.Identifier
	merchant: authly.Identifier
}
// tslint:disable: no-shadowed-variable
export namespace Entry {
	export function is(value: Entry | any): value is Entry {
		return typeof value == "object" &&
			authly.Identifier.is(value.id, 16) &&
			authly.Identifier.is(value.merchant) &&
			EntryCreatable.is(value) &&
			servly.Log.Entry.is(value)
	}
	export function generateId(): authly.Identifier {
		return authly.Identifier.generate(16)
	}
	export function create(merchant: authly.Identifier, entry: EntryCreatable): Entry {
		return { id: generateId(), created: isoly.DateTime.now(), merchant, ...entry, content: servly.Content.freeze(entry.content) }
	}
	export type Creatable = EntryCreatable
	export namespace Creatable {
		export const is = EntryCreatable.is
	}
}
