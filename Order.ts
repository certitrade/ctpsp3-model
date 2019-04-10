import { Currency, DateTime } from "isoly"
import { Event } from "./Event"
import { Item } from "./Item"
import { Customer } from "./Customer"
import { Payment } from "./Payment"

export interface Order {
	id: string
	number?: string
	client: string
	created: DateTime
	customer: Customer
	items: number | Item | Item[]
	currency: Currency
	payment: Payment
	attempt: Partial<Order>[]
	event: Event[]
}
// tslint:disable-next-line: no-namespace
export namespace Order {
	export function is(value: Order | any): value is Order {
		return typeof(value) == "object" &&
			typeof(value.id) == "string" &&
			(typeof(value.number) == "string" || value.number == undefined) &&
			DateTime.is(value.created) &&
			Customer.is(value.customer) &&
			(typeof(value.items) == "number" || typeof(value.items) == "object" && (value.item instanceof Array || Item.is(value.items)) &&
			Currency.is(value.currency)) &&
			Payment.is(value.payment) &&
			Array.isArray(value.attempt) &&
			Array.isArray(value.event) && value.event.every(Event.is)
	}
}
