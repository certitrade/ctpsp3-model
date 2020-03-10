import { Card as PCard } from "../../../Payment/Card"
import { Type } from "../Type"

export interface Creatable {
	type: Type
	scheme: PCard.Scheme
	iin: string
	last4: string
	expires: PCard.Expires
	reference: string
}

// tslint:disable: no-shadowed-variable
export namespace Creatable {
	export function is(value: Creatable | any): value is Creatable {
		return typeof value == "object" &&
			Type.is(value.type) &&
			PCard.Scheme.is(value.scheme) &&
			typeof value.iin == "string" && value.iin.length == 6 &&
			typeof value.last4 == "string" && value.last4.length == 4 &&
			PCard.Expires.is(value.expires) &&
			typeof value.reference == "string"
	}
}
