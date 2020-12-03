import * as isoly from "isoly"
import * as authly from "authly"
import { Creatable as CreatableSubscription } from "./Creatable"

export interface Subscription extends CreatableSubscription {
	id: authly.Identifier
	start: isoly.DateTime
	due?: isoly.DateTime
}

export namespace Subscription {
	export function is(value: any | Subscription): value is Subscription {
		return (
			typeof value == "object" &&
			authly.Identifier.is(value.id, 4) &&
			isoly.DateTime.is(value.start) &&
			(value.due == undefined || isoly.DateTime.is(value.due)) &&
			CreatableSubscription.is(value)
		)
	}
	export type Creatable = CreatableSubscription
	export namespace Creatable {
		export const is = CreatableSubscription.is
	}
}
