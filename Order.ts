import * as isoly from "isoly"
import * as authly from "authly"
import { Customer } from "./Customer"
import { Event } from "./Event"
import { Item } from "./Item"
import { Payment } from "./Payment"
import { Status } from "./Status"

export interface Order {
	id: string
	number?: string
	client?: string
	created: isoly.DateTime
	customer?: Customer
	items: number | Item | Item[]
	currency: isoly.Currency
	payment: Payment | Payment.Creatable | authly.Token
	attempt?: Partial<Order>[]
	event?: Event[]
	status?: Status[]
}

export namespace Order {
	export function is(value: Order | any): value is Order {
		return typeof(value) == "object" &&
			typeof(value.id) == "string" &&
			(typeof(value.number) == "string" || value.number == undefined) &&
			(typeof(value.client) == "string" || value.client == undefined) &&
			isoly.DateTime.is(value.created) &&
			(value.customer == undefined || Customer.is(value.customer)) &&
			Item.canBe(value.items) &&
			isoly.Currency.is(value.currency) &&
			(Payment.is(value.payment) || authly.Token.is(value.payment)) &&
			(value.attempt == undefined || Array.isArray(value.attempt)) &&
			(value.event == undefined || Array.isArray(value.event) && value.event.every(Event.is)) &&
			(value.status == undefined || Array.isArray(value.status) && value.status.every(Status.is))
	}
	export function getCreatablePayment(order: Order | any): Payment.Card | undefined {
		return { ...order.payment, number: order.number, customer: order.customer, items: order.items, amount: Item.amount(order.items), currency: order.currency }
	}
	export function isCreatable(value: Order | any): value is Order {
		return typeof(value) == "object" &&
			value.id == undefined &&
			(typeof(value.number) == "string" || value.number == undefined) &&
			(typeof(value.client) == "string" || value.client == undefined) &&
			(value.created == undefined || isoly.DateTime.is(value.created)) &&
			(value.customer == undefined || Customer.is(value.customer)) &&
			Item.canBe(value.items) &&
			isoly.Currency.is(value.currency) &&
			(Payment.Creatable.is(getCreatablePayment(value)) || authly.Token.is(value.payment)) &&
			(value.attempt == undefined || Array.isArray(value.attempt)) &&
			value.event == undefined &&
			value.status == undefined
	}
	export function setStatus(order: Order): Order
	export function setStatus(orders: Order[]): Order[]
	export function setStatus(orders: Order | Order[]): Order | Order[] {
		if (Array.isArray(orders))
			orders.map(order => setStatus(order))
		else {
			const items = Item.asArray(orders.items)
			if (orders.event)
				for (const event of orders.event)
					Item.applyEvent(items, event)
			orders.items = items.length == 1 ? items[0] : items
			orders.status = [ ...new Set(items.reduce<Status[]>((r, item) => item.status ? r.concat(item.status) : r, [])) ]
		}
		return orders
	}
}
