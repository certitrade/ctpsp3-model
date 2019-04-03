import { Base } from "./Base"

export interface Mobile extends Base {
	type: "mobile"
}

export namespace Mobile {
	export function is(value: any | Mobile): value is Mobile {
		return Base.is(value) &&
			value.type == "mobile"
	}
}
