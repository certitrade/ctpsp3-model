import { PaymentStatus } from "./PaymentStatus"

export interface Payment {
	id: string
	method: string
	status: PaymentStatus
	created: string
}
export namespace Payment {
	export function is(value: Payment | any): value is Payment {
		return typeof(value) == "object" &&
			typeof(value.method) == "string" &&
			PaymentStatus.is(value.status)
	}
}
