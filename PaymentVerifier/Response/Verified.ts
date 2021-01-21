import * as authly from "authly"
import { Base } from "./Base"

export class Verified extends Base {
	readonly result = "success"
	readonly type = "verified"
	static is(value: any | Verified): value is Verified {
		return value instanceof Verified
	}
	constructor(readonly token?: authly.Token) {
		super()
	}
}
