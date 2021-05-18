import * as isoly from "isoly"
import * as selectively from "selectively"
import * as authly from "authly"
import { Frequency } from "../Frequency"
import { Item } from "../Item"
import { Creatable as CreatableSubscription } from "./Creatable"

export interface Subscription extends CreatableSubscription {
	id: authly.Identifier
	start: isoly.Date
	due?: isoly.Date
}

export namespace Subscription {
	export function is(value: any | Subscription): value is Subscription {
		return (
			typeof value == "object" &&
			authly.Identifier.is(value.id, 4) &&
			isoly.Date.is(value.start) &&
			(value.due == undefined || isoly.Date.is(value.due)) &&
			CreatableSubscription.is(value)
		)
	}
	export type Creatable = CreatableSubscription
	export namespace Creatable {
		export const is = CreatableSubscription.is
	}
	export const template = new selectively.Type.Object({
		number: new selectively.Type.String(),
		items: new selectively.Type.Union([new selectively.Type.Number(), Item.template]),
		currency: new selectively.Type.Union(isoly.Currency.types.map(c => new selectively.Type.String(c))),
		schedule: Frequency.template,
		start: new selectively.Type.String(),
		end: new selectively.Type.String(),
		id: new selectively.Type.String(),
		due: new selectively.Type.String(),
	})
}
