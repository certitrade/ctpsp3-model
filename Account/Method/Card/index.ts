import * as isoly from "isoly"
import * as selectively from "selectively"
import * as authly from "authly"
import { Card as PCard } from "../../../Payment/Card"
import { Type } from "../Type"
import { Creatable as CardCreatable } from "./Creatable"

export interface Card {
	type: Type
	created: isoly.DateTime
	token: authly.Token
	scheme: PCard.Scheme
	iin: string
	last4: string
	expires: PCard.Expires
	acquirer?: "intergiro" | "clearhaus"
}

export namespace Card {
	export function is(value: Card | any): value is Card {
		return (
			typeof value == "object" &&
			Type.is(value.type) &&
			isoly.DateTime.is(value.created) &&
			authly.Token.is(value.token) &&
			PCard.Scheme.is(value.scheme) &&
			typeof value.iin == "string" &&
			value.iin.length == 6 &&
			typeof value.last4 == "string" &&
			value.last4.length == 4 &&
			PCard.Expires.is(value.expires) &&
			(value.acquirer == undefined || value.acquirer == "intergiro" || value.acquirer == "clearhaus")
		)
	}
	export type Creatable = CardCreatable
	export namespace Creatable {
		export const is = CardCreatable.is
		export const verify = CardCreatable.verify
		export type Token = CardCreatable.Token
		export namespace Token {
			export const is = CardCreatable.Token.is
		}
	}
	export const template = new selectively.Type.Object({
		scheme: new selectively.Type.Union([
			new selectively.Type.String("unknown"),
			new selectively.Type.String("amex"),
			new selectively.Type.String("dankort"),
			new selectively.Type.String("diners"),
			new selectively.Type.String("discover"),
			new selectively.Type.String("electron"),
			new selectively.Type.String("interpayment"),
			new selectively.Type.String("jcb"),
			new selectively.Type.String("maestro"),
			new selectively.Type.String("mastercard"),
			new selectively.Type.String("unionpay"),
			new selectively.Type.String("visa"),
		]),
		iin: new selectively.Type.String(),
		last4: new selectively.Type.String(),
		expires: new selectively.Type.String(),
		type: new selectively.Type.Union([new selectively.Type.String("debit"), new selectively.Type.String("credit")]),
		csc: new selectively.Type.Union([
			new selectively.Type.String("matched"),
			new selectively.Type.String("mismatched"),
			new selectively.Type.String("present"),
		]),
	})
}
