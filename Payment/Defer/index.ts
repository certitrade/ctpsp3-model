import { Base } from "../Base"
import { Creatable as DeferCreatable } from "./Creatable"
import { Method as DeferMethod } from "./Method"

export interface Defer extends Base, Omit<DeferCreatable, "currency"> {
	type: "defer"
}

export namespace Defer {
	export function is(value: any | Defer): value is Defer {
		return DeferCreatable.is(value) && Base.is(value)
	}
	export type Creatable = DeferCreatable
	export namespace Creatable {
		export const is = DeferCreatable.is
	}
	export type Method = DeferMethod
	export namespace Method {
		export const is = DeferMethod.is
	}
}
