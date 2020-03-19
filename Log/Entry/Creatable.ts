import authly from "authly"
import { Level } from "../Level"
import { Reference } from "../Reference"
import { Content } from "../Content"

export interface Creatable {
	level: Level
	reference: Reference
	point: string
	step: string
	client?: authly.Identifier
	content: Content
}
export namespace Creatable {
	export function is(value: any | Creatable): value is Creatable {
		return typeof value == "object" &&
			Level.is(value.level) &&
			Reference.is(value.reference) &&
			typeof value.point == "string" &&
			typeof value.step == "string" &&
			(value.client == undefined || authly.Identifier.is(value.client)) &&
			Content.is(value.content)
	}
}