import * as gracely from "gracely"
import * as isoly from "isoly"
import * as authly from "authly"
import { Customer } from "../Customer"
import { Event } from "../Event"
import { Item } from "../Item"
import { Key } from "../Key"
import { Payment } from "../Payment"
import { Status } from "../Status"
import { verify as verifyToken } from "../verify"
import { Change as OrderChange } from "./Change"
import { Creatable as OrderCreatable } from "./Creatable"
import { StatusList as OrderStatusList } from "./StatusList"

export interface Order {
	id: authly.Identifier
	number?: string
	client?: string
	created: isoly.DateTime
	customer?: Customer
	items: number | Item | Item[]
	currency: isoly.Currency
	payment: Payment
	account?: authly.Identifier
	subscription?: authly.Identifier
	event?: Event[]
	status?: Status[] | OrderStatusList
	theme?: string
	meta?: any
	callback?: string
	language?: isoly.Language
}
export namespace Order {
	export function is(value: Order | any): value is Order {
		return (
			typeof value == "object" &&
			authly.Identifier.is(value.id, 16) &&
			(typeof value.number == "string" || value.number == undefined) &&
			(typeof value.client == "string" || value.client == undefined) &&
			isoly.DateTime.is(value.created) &&
			(value.customer == undefined || Customer.is(value.customer)) &&
			Item.canBe(value.items) &&
			isoly.Currency.is(value.currency) &&
			Payment.is(value.payment) &&
			(value.account == undefined || authly.Identifier.is(value.account, 16)) &&
			(value.subscription == undefined || authly.Identifier.is(value.subscription, 4)) &&
			(value.event == undefined || (Array.isArray(value.event) && value.event.every(Event.is))) &&
			(value.status == undefined ||
				(Array.isArray(value.status) && value.status.every(Status.is)) ||
				OrderStatusList.is(value.status)) &&
			(value.theme == undefined || typeof value.theme == "string") &&
			(typeof value.callback == "string" || value.callback == undefined) &&
			(value.language == undefined || isoly.Language.is(value.language))
		)
	}
	export function flaw(value: Order | any): gracely.Flaw {
		return {
			type: "model.Order",
			flaws:
				typeof value != "object"
					? undefined
					: [
							authly.Identifier.is(value.id, 16) || {
								property: "id",
								type: "authly.Identifier",
								condition: "length == 16",
							},
							typeof value.number == "string" ||
								value.number == undefined || { property: "number", type: "string | undefined" },
							typeof value.client == "string" ||
								value.client == undefined || { property: "client", type: "string | undefined" },
							isoly.DateTime.is(value.created) || { property: "created", type: "DateTime" },
							value.customer == undefined ||
								Customer.is(value.customer) || { property: "customer", type: "Customer | undefined" },
							Item.canBe(value.items) || { property: "items", type: "number | Item | Item[]" },
							isoly.Currency.is(value.currency) || { property: "currency", type: "Currency" },
							Payment.is(value.payment) || { property: "payment", type: "Payment" },
							value.event == undefined ||
								(Array.isArray(value.event) && value.event.every(Event.is)) || {
									property: "event",
									type: "Event[] | undefined",
								},
							value.status == undefined ||
								(Array.isArray(value.status) && value.status.every(Status.is)) ||
								StatusList.is(value.status) || {
									property: "status",
									type: "Status[] | { [status in Status]?: number | undefined } | undefined",
								},
							value.theme == undefined ||
								typeof value.theme == "string" || { property: "theme", type: "string | undefined" },
							value.callback == undefined ||
								typeof value.callback == "string" || { property: "callback", type: "string | undefined" },
							value.language == undefined ||
								isoly.Language.is(value.language) || { property: "language", type: "isoly.Language | undefined" },
					  ].filter(gracely.Flaw.is),
		}
	}
	export async function generateCallback(
		merchant: authly.Token | Key | undefined,
		order: Partial<Order | Order.Creatable>
	): Promise<string | undefined> {
		if (authly.Token.is(merchant))
			merchant = await Key.unpack(merchant, "public")
		return (
			merchant &&
			`${merchant.iss}/callback/${merchant.sub}/${await authly.Issuer.create("callback", authly.Algorithm.none())?.sign(
				order
			)}`
		)
	}
	export function generateId(): authly.Identifier {
		return authly.Identifier.generate(16)
	}
	export async function verify(token: authly.Token): Promise<Order | undefined> {
		const result = await verifyToken(token)
		return is(result) ? result : undefined
	}
	export function possibleEvents(orders: Order[]): Event.Type[] {
		return Event.types.filter(type =>
			orders.every(
				order =>
					!order.status ||
					(Array.isArray(order.status)
						? order.status?.some(status => Status.change(status, type))
						: Object.entries(order.status).some(
								status => Status.is(status[0]) && typeof status[1] == "number" && Status.change(status[0], type)
						  ))
			)
		)
	}
	export function sort(value: Order[], property: "created"): Order[] {
		return value.sort(getComparer(property))
	}
	export function getComparer(property: "created"): (left: Order, right: Order) => number {
		let result: (left: Order, right: Order) => number
		switch (property) {
			case "created":
			default:
				result = (left: Order, right: Order) =>
					left.created < right.created ? 1 : left.created > right.created ? -1 : 0
				break
		}
		return result
	}
	export function filter(value: Order[], property: "paymentType", criterion: string): Order[]
	export function filter(value: Order[], property: "client", criterion: authly.Identifier): Order[]
	export function filter(value: Order[], property: "status", criterion: Status | Status[]): Order[]
	export function filter(
		value: Order[],
		property: "client" | "status" | "paymentType",
		criterion: authly.Identifier | Status | Status[] | string
	): Order[] {
		let result: Order[] = []
		switch (property) {
			case "client":
				result = value.filter(order => order.client == criterion)
				break
			case "status":
				const criteria: Status[] = Array.isArray(criterion) ? criterion : [criterion as Status]
				result = value.filter(
					order =>
						order.status &&
						Object.entries(order.status).some(
							status => Status.is(status[0]) && typeof status[1] == "number" && criteria.some(c => c == status[0])
						)
				)
				break
			case "paymentType":
				result = value.filter(order => order.payment.type == criterion)
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
			let items: Item[] = []
			if (typeof orders.items == "number") {
				let sums: StatusList = { created: orders.items }
				if (orders.event) {
					for (const event of orders.event)
						sums = Item.applyAmountEvent(sums, event, orders.items)
					const events: Event[] = orders.event.reduce<Event[]>((p: Event[], c: Event) => {
						if (!p.some(pp => pp.type == c.type))
							p.push(c)
						return p
					}, [] as Event[])
					for (const event of events)
						if (sums[Status.fromEvent(event.type)] ?? 0 > 0)
							items.push({ price: sums[Status.fromEvent(event.type)], status: [Status.fromEvent(event.type)] })
				}
			} else {
				items = Item.asArray(orders.items)
				if (orders.event)
					for (const event of orders.event)
						Item.applyEvent(items, event)
			}
			orders.items = items.length == 1 ? items[0] : items
			orders.status = items.reduce<StatusList>((r, item) => {
				return (r = item.status
					? item.status.reduce((output: StatusList, s: Status) => {
							output[s] = (output[s] ?? 0) + (Item.amount(item) ?? 0) / (item.quantity ?? 1)
							return output
					  }, r)
					: r)
			}, {} as StatusList)
			if (orders.event) {
				orders.status.settled = orders.event.reduce<number>((sum, e) => {
					if (Event.Settle.is(e))
						sum += e.net
					return sum
				}, 0)
				if (orders.status.settled == 0)
					delete orders.status.settled
			}
		}
		return orders
	}
	export function amountsPerStatus(order: Order): StatusList {
		if (!order.status)
			order = setStatus(order)
		return Item.asArray(order.items).reduce<StatusList>((result: StatusList, item: Item) => {
			const price = Item.amount(item) / (item.quantity ?? 1)
			return (
				item.status?.reduce((r, s) => {
					r[s] = price + (r[s] ?? 0)
					return r
				}, result) ?? result
			)
		}, {} as StatusList)
	}
	export function getCsvHeaders(): string {
		let result = ``
		result += `id,`
		result += `number,`
		result += `created,`
		result += `client,`
		result += Customer.getCsvHeaders() + `,`
		result += Item.getCsvHeaders() + `,`
		result += `currency,`
		result += Payment.getCsvHeaders() + `,`
		result += `status`
		result += `\r\n`
		return result
	}
	export function toCsv(value: Order | Order[]): string {
		let result = getCsvHeaders()
		if (!Array.isArray(value))
			result += orderToCsv(value)
		else
			for (const order of value)
				result += orderToCsv(order)
		return result
	}
	export function orderToCsv(value: Order): string {
		let result = ``
		result += `"` + value.id + `",`
		result += value.number ? `"` + value.number + `",` : `,`
		result += `"` + value.created + `",`
		result += value.client ? `"` + value.client + `",` : `,`
		result += Customer.toCsv(value.customer) + `,`
		result += Item.toCsv(value.items) + `,`
		result += `"` + value.currency + `",`
		result += Payment.toCsv(value.payment) + `,`
		result += Status.toCsv(value.status)
		result += `\r\n`
		return result
	}
	export type StatusList = OrderStatusList
	export namespace StatusList {
		export const is = OrderStatusList.is
	}
	export type Creatable = OrderCreatable
	export namespace Creatable {
		export const is = OrderCreatable.is
		export const flaw = OrderCreatable.flaw
	}
	export type Change = OrderChange
	export namespace Change {
		export const is = OrderChange.is
		export const isArray = OrderChange.isArray
	}
}
