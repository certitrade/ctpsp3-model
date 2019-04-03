import { Base } from "./Base"

export interface Direct extends Base {
	type: "direct"
	banks: { name: string }[]
}

export namespace Direct {
	export function is(value: any | Direct): value is Direct {
		return Base.is(value) &&
			value.type == "direct"
	}
}
