import { Customer } from "./Customer"
import { Currency, DateTime } from "isoly"
import { Event } from "./Event"
import { Item } from "./Item"
import { Payment } from "./Payment"
import { Status } from "./Status"

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
	status: Status[]
}
// tslint:disable-next-line: no-namespace
export namespace Order {
	export function is(value: Order | any): value is Order {
		return typeof(value) == "object" &&
			typeof(value.id) == "string" &&
			(typeof(value.number) == "string" || value.number == undefined) &&
			DateTime.is(value.created) &&
			Customer.is(value.customer) &&
			Item.canBe(value.items) &&
			Currency.is(value.currency) &&
			Payment.is(value.payment) &&
			Array.isArray(value.attempt) &&
			Array.isArray(value.event) && value.event.every(Event.is) &&
			(typeof(value.status) == "object" && Status.is(value.status))
	}
	export function setStatus(order: Order): Order
	export function setStatus(orders: Order[]): Order[]
	export function setStatus(orders: Order | Order[]): Order | Order[] {
		if (Array.isArray(orders)){
			orders.map(order => {
				const items = Item.asArray(order.items)
				for (const event of order.event)
					Item.applyEvent(items, event)
				order.items = items.length == 1 ? items[0] : items
				order.status = [ ...new Set(items.reduce<Status[]>((r, item) => item.status ? r.concat(item.status) : r, [])) ]
			})
		}
		return orders
	}
}
