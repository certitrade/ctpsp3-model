import * as authly from "authly"
import * as isoly from "isoly"
import { Base } from "../Base"
import { Creatable as DeferCreatable } from "./Creatable"
import { Method as DeferMethod } from "./Method"
import { Item } from "../../Item"
import { Status } from "../Status"

export interface Defer extends Base, Omit<DeferCreatable, "currency"> {
	type: "defer"
}

export namespace Defer {
	export function is(value: any | Creatable): value is Creatable {
		return typeof value == "object" &&
			value.type == "defer" &&
			Method.is(value.method) &&
			typeof value.contact == "string" &&
			(value.message == undefined || typeof value.message == "string") &&
			Item.canBe(value.items) &&
			(value.theme == undefined || typeof value.theme == "string") &&
			(value.client == undefined || authly.Identifier.is(value.client)) &&
			(value.number == undefined || typeof value.number == "string") &&
			(value.descriptor == undefined || typeof value.descriptor == "string") &&
			typeof value.id == "string" &&
			(value.reference == undefined || typeof value.reference == "string") &&
			typeof value.service == "string" &&
			isoly.DateTime.is(value.created) &&
			typeof value.amount == "number" &&
			(typeof value.descriptor == "string" || value.descriptor == undefined) &&
			Status.is(value.status)
	}
	export type Creatable = DeferCreatable
	export namespace Creatable {
		// tslint:disable-next-line: no-shadowed-variable
		export const is = DeferCreatable.is
	}
	export type Method = DeferMethod
	export namespace Method {
		// tslint:disable-next-line: no-shadowed-variable
		export const is = DeferMethod.is
	}
}
