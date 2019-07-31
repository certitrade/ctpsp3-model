import { Base } from "../Base"
import { Creatable as DeferCreatable } from "./Creatable"
import { Method as DeferMethod } from "./Method"

export interface Defer extends Base, DeferCreatable {
	type: "defer"
}

export namespace Defer {
	export function is(value: any | Defer): value is Defer {
		return DeferCreatable.is(value) &&
			Base.is(value)
	}
	export function sort(value: Defer[], property: "created"): Defer[] {
		return value.sort(getComparer(property))
	}
	export function getComparer(property: "created"): (left: Defer, right: Defer) => number {
		let result: (left: Defer, right: Defer) => number
		switch (property) {
			case "created":
				result = left.created < right.created ? 1 : left.created > right.created ? -1 : 0
				break
		}	
		return result
	}
	export type Creatable = DeferCreatable
	export namespace Creatable {
		// tslint:disable-next-line: no-shadowed-variable
		export const is = DeferCreatable.is
	}
	export type Method = DeferMethod
	export namespace Method {
		// tslint:disable-next-line: no-shadowed-variable
		export const is = DeferMethod.is
	}
}
