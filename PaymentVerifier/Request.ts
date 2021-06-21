import * as isoly from "isoly"
import { Contact } from "@payfunc/model-base"
import { Customer } from "../Customer"
import { Item } from "../Item"
import { Log } from "../Log"
import { Order } from "../Order"
import { Payment } from "../Payment"

export class Request {
	private constructor(
		readonly reference: Readonly<Log.Reference>,
		readonly payment: Readonly<Payment | Payment.Creatable>,
		readonly currency: Readonly<isoly.Currency>,
		readonly items: number | Item | Item[],
		readonly customer: Readonly<Contact> | undefined,
		readonly client: { readonly ip?: string }
	) {}

	static create(
		payload: (Customer.Creatable & { payment: Payment.Creatable }) | Order | Order.Creatable,
		client: { ip?: string }
	): Request {
		return new Request(
			{
				type: Customer.Creatable.is(payload) ? "customer" : "order",
				id: payload.id,
				number: payload.number,
				customer: Order.Creatable.is(payload) && typeof payload.customer == "string" ? payload.customer : undefined,
			},
			payload.payment,
			!Customer.Creatable.is(payload) ? payload.payment.currency ?? payload.currency ?? "EUR" : "EUR",
			Customer.Creatable.is(payload) ? 0 : payload.items,
			Customer.is(payload.customer) ? payload.customer : undefined,
			client
		)
	}
}
