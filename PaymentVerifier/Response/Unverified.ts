import { Base } from "./Base"

export class Unverified extends Base {
	readonly result = "success"
	readonly type = "unverified"
	constructor() {
			super()
		}
}
