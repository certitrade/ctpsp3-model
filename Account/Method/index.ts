import * as gracely from "gracely"
import { Card as MethodCard } from "./Card"

export type Method = Method.Card

export namespace Method {
	export function is(value: Method | any): value is Method {
		return MethodCard.is(value)
	}
	export function flaw(value: Method | any): gracely.Flaw {
		return MethodCard.flaw(value)
	}
	// tslint:disable: no-shadowed-variable
	export type Card = MethodCard
	export namespace Card {
		export const is = MethodCard.is
		export const flaw = MethodCard.flaw
	}
}
