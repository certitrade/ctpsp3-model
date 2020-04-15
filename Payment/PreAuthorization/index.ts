import * as authly from "authly"
import { Base } from "../Base"
import { Creatable as PreAuthorizationCreatable } from "./Creatable"

export interface PreAuthorization extends Base {
	type: "preauthorization"
	token: authly.Token
}

export namespace PreAuthorization {
	export function is(value: any | PreAuthorization): value is PreAuthorization {
		return typeof value == "object" &&
			value.type == "preauthorization" &&
			authly.Token.is(value.token) &&
			Base.is(value)
	}

	export type Creatable = PreAuthorizationCreatable
	export namespace Creatable {
	// tslint:disable: no-shadowed-variable
		export const is = PreAuthorizationCreatable.is
		export const flaw = PreAuthorizationCreatable.flaw
	}
}
