import * as authly from "authly"
import { Creatable as CCreatable } from "./Creatable"

export type Mixed = authly.Token

export namespace Mixed {
	export function is(value: any | Mixed): value is Mixed {
		return authly.Token.is(value)
	}
	// tslint:disable: no-shadowed-variable
	export type Creatable = CCreatable
	export namespace Creatable {
		export const is = CCreatable.is
		export const flaw = CCreatable.flaw
	}
}
