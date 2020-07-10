import * as authly from "authly"
import { Creatable as MixedCreatable } from "./Creatable"

export type Mixed = authly.Token

export namespace Mixed {
	export function is(value: any | Mixed): value is Mixed {
		return authly.Token.is(value)
	}
	// tslint:disable: no-shadowed-variable
	export type Creatable = MixedCreatable
	export namespace Creatable {
		export const is = MixedCreatable.is
		export const flaw = MixedCreatable.flaw
	}
}
