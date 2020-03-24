import * as authly from "authly"
import { Level } from "../Level"
import { Reference } from "../Reference"
import { Content } from "../Content"

export interface Creatable {
	reference: Reference
	client?: authly.Identifier
	system: string
	point: string
	step: string
	level: Level
	content: Content
}
export namespace Creatable {
	export function is(value: any | Creatable): value is Creatable {
		return typeof value == "object" &&
			Reference.is(value.reference) &&
			(value.client == undefined || authly.Identifier.is(value.client)) &&
			typeof value.system == "string" &&
			typeof value.point == "string" &&
			typeof value.step == "string" &&
			Level.is(value.level) &&
			Content.is(value.content)
	}
}
