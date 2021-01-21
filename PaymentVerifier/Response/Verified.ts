import { Base } from "./Base"
import * as authly from "authly"

export class Verified extends Base {
	readonly result = "success"
	readonly type = "verified"
	static is(value: any | Verified): value is Verified {
		return value instanceof Verified
	}
	constructor(readonly token: authly.Token) {
		super()
	}
}
