import { Currency, isCurrency } from "./Currency"
import { Item, isItem } from "./Item"
import { PaymentStatus } from "./PaymentStatus"

export interface Payment {
	method: string,
	item: number | Item | Item[]
	currency: Currency
	id?: string
	created?: string
	status?: PaymentStatus
}

export function isPayment(payment: Payment | any): payment is Payment {
	return typeof(payment) == "object" &&
		(typeof(payment.item) == "number" || typeof(payment.item) == "object" && (payment.item instanceof Array || isItem(payment.item)) &&
		isCurrency(payment.currency))
}
