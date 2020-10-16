import * as authly from "authly"
import * as isoly from "isoly"
import { Creatable as LinkCreatable } from "./Creatable"

export interface Link {
	url: string
	created: isoly.DateTime
	expires: isoly.DateTime
	key?: authly.Token
	contact?: string
}

export namespace Link {
	export function is(value: Link | any): value is Link {
		return (
			typeof value == "object" &&
			value.id == "string" &&
			isoly.DateTime.is(value.created) &&
			isoly.DateTime.is(value.expires) &&
			(value.key == undefined || authly.Token.is(value.key)) &&
			(value.contact == "string" || value.contact == undefined)
		)
	}
	export type Creatable = LinkCreatable
	export namespace Creatable {
		export const is = LinkCreatable.is
	}
}
