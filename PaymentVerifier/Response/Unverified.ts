import { Base } from "./Base"

export class Unverified extends Base {
	readonly result = "success"
	readonly type = "unverified"
	static is(value: any | Unverified): value is Unverified {
		return value instanceof Unverified
	}
	constructor() {
		super()
	}
}
