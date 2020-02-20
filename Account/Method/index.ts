import { Card as MethodCard } from "./Card"

export type Method = Method.Card

export namespace Method {
	export function is(value: Method | any): value is Method {
		return MethodCard.is(value)
	}
	// tslint:disable: no-shadowed-variable
	export type Card = MethodCard
	export namespace Card {
		export const is = MethodCard.is
	}
}
