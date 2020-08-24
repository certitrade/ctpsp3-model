import { Account } from "../Account"
import { Customer } from "../Customer"
import { Item } from "../Item"
import { Log } from "../Log"
import { Order } from "../Order"
import { Payment } from "../Payment"

export class Request {
	private constructor(
		readonly reference: Readonly<Log.Reference>,
		readonly payment: Readonly<Payment | Payment.Creatable>,
		readonly items: number | Item | Item[],
		readonly customer: Readonly<Customer> | undefined,
		readonly client: { readonly ip?: string }
	) {}

	static create(
		payload: (Account.Creatable & { payment: Payment.Creatable }) | Order | Order.Creatable,
		client: { ip?: string }
	): Request {
		return new Request(
			{ type: Account.Creatable.is(payload) ? "account" : "order", id: payload.id, number: payload.number },
			payload.payment,
			Account.Creatable.is(payload) ? 0 : payload.items,
			payload.customer,
			client
		)
	}
}
