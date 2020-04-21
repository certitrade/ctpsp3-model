import * as authly from "authly"
import * as servly from "servly"
import { Reference } from "../Reference"
import { System } from "../System"

export interface Creatable extends servly.Log.Entry.Creatable {
	point: string
}
export namespace Creatable {
	export function is(value: any | Creatable): value is Creatable {
		return typeof value == "object" &&
			(value.id == undefined || authly.Identifier.is(value.id, 16)) &&
			Reference.is(value.reference) &&
			(value.client == undefined || authly.Identifier.is(value.client)) &&
			System.is(value.system) &&
			typeof value.point == "string" &&
			servly.Log.Entry.Creatable.is(value)
	}
}
