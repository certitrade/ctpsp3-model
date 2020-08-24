import { Base } from "./Base"

export class Verified extends Base {
	readonly result = "success"
	readonly type = "verified"
	constructor() {
			super()
		}
}
