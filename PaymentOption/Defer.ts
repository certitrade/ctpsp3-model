import { Base } from "./Base"
import { Method } from "../Payment/Defer/Method"

export interface Defer extends Base {
	type: "defer"
	method: Method | Method[]
}

export namespace Defer {
	export function is(value: any | Defer): value is Defer {
		return (
			Base.is(value) &&
			value.type == "defer" &&
			((Array.isArray(value.method) && value.method.every(Method.is)) || Method.is(value.method))
		)
	}
	export function getMethods(option: Defer): Method[] {
		return Array.isArray(option.method) ? option.method : [option.method]
	}
}
