import { Base } from "./Base"

export interface Charge extends Base {
	type: "charge"
}

export namespace Charge {
	export function is(value: Charge | any): value is Charge {
		return Base.is(value) && value.type == "charge"
	}
}
