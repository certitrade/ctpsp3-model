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
	static is(value: any | VerificationRequired): value is VerificationRequired {
		return value instanceof VerificationRequired
	}
	static isVerificationError(
		value: any | gracely.Error
	): value is {
		status: 400
		type: "malformed content"
		content: {
			property: string
			type: string
			description: "verification required"
			details: {
				visible: boolean
				method: "GET" | "POST"
				url: string
				data?: {
					[property: string]: string | undefined
				}
			}
		}
	} {
		const result =
			typeof value == "object" &&
			value.type == "malformed content" &&
			typeof value.content == "object" &&
			typeof value.content.property == "string" &&
			typeof value.content.type == "string" &&
			value.content.description == "verification required" &&
			typeof value.content.details == "object" &&
			typeof value.content.details.visible == "boolean" &&
			(value.content.details.method == "GET" || value.content.details.method == "POST") &&
			typeof value.content.details.url == "string" &&
			(value.content.details.data == undefined ||
				(typeof value.content.details.data == "object" &&
					Object.values(value.content.details.data).every(v => v == undefined || typeof v == "string")))
		return result
	}
	static isCardTokenVerificationError(
		value: any | gracely.Error
	): value is {
		status: 400
		type: "malformed content"
		content: {
			property: string
			type: "Card.Token"
			description: "verification required"
			details: {
				visible: boolean
				method: "GET" | "POST"
				url: string
				data?: {
					[property: string]: string | undefined
				}
			}
		}
	} {
		return this.isVerificationError(value) && value.content.type == "Card.Token"
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
