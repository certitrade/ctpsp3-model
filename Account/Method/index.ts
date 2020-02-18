import * as gracely from "gracely"
import { Card as MethodCard } from "./Card"
import { DateTime } from "isoly"

export type Method = Method.Card

export namespace Method {
	export function is(value: Method | any): value is Method {
		return typeof value == "object" &&
			value.type == undefined || MethodCard.is(value.type) &&
			value.created == undefined || DateTime.is(value.type)
	}
	export function flaw(value: Method | any): gracely.Flaw {
		return {
			type: "model.Account.Method",
			flaws: typeof value != "object" ? undefined :
				[
					(value.type == undefined || MethodCard.is(value.type)) || { property: "type", type: "Account.Method.Card" },
					(value.created == undefined || DateTime.is(value.type)) || { property: "created", type: "isoly.DateTime" },
				].filter(gracely.Flaw.is) as gracely.Flaw[],
		}
	}
	// tslint:disable: no-shadowed-variable
	export type Card = MethodCard
	export namespace Card {
		export const is = MethodCard.is
	}
}
