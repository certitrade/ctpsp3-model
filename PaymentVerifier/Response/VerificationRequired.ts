import * as gracely from "gracely"
import { Base } from "./Base"

export class VerificationRequired extends Base {
	readonly result = "failure"
	readonly type = "verification required"
	constructor(
		readonly visible: boolean,
		readonly method: "GET" | "POST",
		readonly url: string,
		readonly data?: { [property: string]: string }
	) {
		super()
	}
	toError(property: string, type: string): gracely.Error {
		return gracely.client.malformedContent(property, type, "verification required", {
			visible: this.visible,
			method: this.method,
			url: this.url,
			data: this.data,
		})
	}
}
