import * as isoly from "isoly"
import * as authly from "authly"
import { Content } from "../Content"
import { Creatable as EntryCreatable } from "./Creatable"

export interface Entry extends EntryCreatable {
	id: authly.Identifier
	created: isoly.DateTime
	merchant: authly.Identifier
}
// tslint:disable: no-shadowed-variable
export namespace Entry {
	export function is(value: Entry | any): value is Entry {
		return typeof value == "object" &&
			authly.Identifier.is(value.id) &&
			isoly.DateTime.is(value.created) &&
			authly.Identifier.is(value.merchant) &&
			EntryCreatable.is(value)
	}
	export function create(merchant: authly.Identifier, entry: EntryCreatable): Entry {
		return { id: authly.Identifier.generate(16), created: isoly.DateTime.now(), merchant, ...entry, content: Content.freeze(entry.content) }
	}
	export type Creatable = EntryCreatable
	export namespace Creatable {
		export const is = EntryCreatable.is
	}
}
