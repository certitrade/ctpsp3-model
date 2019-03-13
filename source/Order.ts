import { Currency } from "./Currency"
import { Item } from "./Item"
import { Customer } from "./Customer"
import { Payment } from "./Payment"
import { DateTime } from "./DateTime"

export interface Order {
	id: string
	created: DateTime
	customer: Customer
	items: number | Item | Item[]
	currency: Currency
	payments: Payment[]
}
// tslint:disable-next-line: no-namespace
export namespace Order {
	export function is(value: Order | any): value is Order {
		return typeof(value) == "object" &&
			(typeof(value.item) == "number" || typeof(value.item) == "object" && (value.item instanceof Array || Item.is(value.item)) &&
			Currency.is(value.currency))
	}
}
