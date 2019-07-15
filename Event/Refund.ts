import { Base } from "./Base"

export interface Refund extends Base {
	type: "refund"
}

export namespace Refund {
	export function is(value: Refund | any): value is Refund {
		return Base.is(value) && value.type == "refund"
	}
}
