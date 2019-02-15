import { Currency } from "./Currency"
import { Item } from "./Item"
import { PaymentStatus } from "./PaymentStatus"

export interface Payment {
	method: string,
	item: number | Item | Item[]
	currency: Currency
	id?: string
	created?: string
	status?: PaymentStatus
}
// tslint:disable-next-line: no-namespace
export namespace Payment {
	export function is(value: Payment | any): value is Payment {
		return typeof(value) == "object" &&
			(typeof(value.item) == "number" || typeof(value.item) == "object" && (value.item instanceof Array || Item.is(value.item)) &&
			Currency.is(value.currency))
	}
}
