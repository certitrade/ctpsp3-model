import * as authly from "authly"
import { Content } from "../Content"
import { Level } from "../Level"
import { Reference } from "../Reference"
import { System } from "../System"

export interface Creatable {
	reference: Reference
	client?: authly.Identifier
	system: System
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
			System.is(value.system) &&
			typeof value.point == "string" &&
			typeof value.step == "string" &&
			Level.is(value.level) &&
			Content.is(value.content)
	}
}
