import { Base } from "../Base"
import { Method as DMethod } from "./Method"

export interface Defer extends Base {
	type: "defer"
	method: DMethod
	address: string
	message?: string
}

export namespace Defer {
	export function is(value: any | Defer): value is Defer {
		return typeof(value) == "object" &&
			value.type == "defer" &&
			DMethod.is(value.method) &&
			typeof(value.address) == "string" &&
			(value.message == undefined || typeof(value.message) == "string") &&
			Base.is(value)
	}
	export type Method = DMethod
	export namespace Method {
// tslint:disable-next-line: no-shadowed-variable
		export const is = DMethod.is
	}
}
