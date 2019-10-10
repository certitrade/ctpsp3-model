import * as isoly from "isoly"
import * as authly from "authly"
import * as gracely from "gracely"
import { Customer } from "../Customer"
import { Event } from "../Event"
import { Item } from "../Item"
import { Payment } from "../Payment"
import { Status } from "../Status"
import { Change as OrderChange } from "./Change"
import { Creatable as OrderCreatable } from "./Creatable"

export interface Order {
	id: authly.Identifier
	number?: string
	client?: string
	created: isoly.DateTime
	customer?: Customer
	items: number | Item | Item[]
	currency: isoly.Currency
	payment: Payment | Payment.Creatable | authly.Token
	attempt?: (Partial<Payment.Creatable> | Payment | authly.Token)[]
	event?: Event[]
	status?: Status[]
}

export namespace Order {
	export function is(value: Order | any): value is Order {
		return typeof value == "object" &&
			authly.Identifier.is(value.id) &&
			(typeof value.number == "string" || value.number == undefined) &&
			(typeof value.client == "string" || value.client == undefined) &&
			isoly.DateTime.is(value.created) &&
			(value.customer == undefined || Customer.is(value.customer)) &&
			Item.canBe(value.items) &&
			isoly.Currency.is(value.currency) &&
			(Payment.is(value.payment) || authly.Token.is(value.payment)) &&
			(value.attempt == undefined || Array.isArray(value.attempt)) &&
			(value.event == undefined || Array.isArray(value.event) && value.event.every(Event.is)) &&
			(value.status == undefined || Array.isArray(value.status) && value.status.every(Status.is))
	}
	export function flaw(value: Order | any): gracely.Flaw {
		return {
			type: "model.Order",
			flaws: typeof value != "object" ? undefined :
				[
					authly.Identifier.is(value.id) || { property: "id", type: "authly.Identifier" },
					typeof value.number == "string" || value.number == undefined || { property: "number", type: "string | undefined" },
					typeof value.client == "string" || value.client == undefined || { property: "client", type: "string | undefined" },
					isoly.DateTime.is(value.created) || { property: "created", type: "DateTime" },
					value.customer == undefined || Customer.is(value.customer) || { property: "customer", type: "Customer | undefined" },
					Item.canBe(value.items) || { property: "items", type: "number | Item | Item[]" },
					isoly.Currency.is(value.currency) || { property: "currency", type: "Currency" },
					Payment.is(value.payment) || authly.Token.is(value.payment) || { property: "payment", type: "Payment | Token" },
					value.attempt == undefined || Array.isArray(value.attempt) || { property: "attempt", type: "Array | undefined" },
					value.event == undefined || Array.isArray(value.event) && value.event.every(Event.is) || { property: "event", type: "Event[] | undefined" },
					value.status == undefined || Array.isArray(value.status) && value.status.every(Status.is) || { property: "status", type: "Status[] | undefined" },
				].filter(gracely.Flaw.is),
		}
	}
	export function possibleEvents(orders: Order[]): Event.Type[] {
		return Event.types.filter(type => orders.every(order => !order.status || order.status.some(status => Status.change(status, type))))
	}
	export function sort(value: Order[], property: "created"): Order[] {
		return value.sort(getComparer(property))
	}
	export function getComparer(property: "created"): (left: Order, right: Order) => number {
		let result: (left: Order, right: Order) => number
		switch (property) {
			case "created":
			default:
				result = (left: Order, right: Order) => left.created < right.created ? 1 : left.created > right.created ? -1 : 0
				break
		}
		return result
	}
	export function filter(value: Order[], property: "client", criterion: authly.Identifier): Order[]
	export function filter(value: Order[], property: "status", criterion: Status | Status[]): Order[]
	export function filter(value: Order[], property: "client" | "status", criterion: authly.Identifier | Status | Status[]): Order[] {
		let result: Order[] = []
		switch (property) {
			case "client":
				result = value.filter(order => order.client == criterion)
				break
			case "status":
				const criteria: Status[] = Array.isArray(criterion) ? criterion : [ criterion as Status ]
				result = value.filter(order => order.status && order.status.some(s => criteria.some(c => c == s)))
				break
			default:
				result = value
				break
			}
		return result
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
	export type Creatable = OrderCreatable
	export namespace Creatable {
		// tslint:disable-next-line: no-shadowed-variable
		export const is = OrderCreatable.is
	}
	export type Change = OrderChange
	export namespace Change {
		// tslint:disable-next-line: no-shadowed-variable
		export const is = OrderChange.is
		export const isArray = OrderChange.isArray
	}
}
