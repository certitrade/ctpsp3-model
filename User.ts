import { Merchant } from "./Merchant"

export interface User {
	id: string
	email: string
	merchant: Merchant | Merchant[]
}

export namespace User {
	export function is(value: any | User): value is User {
		return typeof value == "object" &&
			typeof value.id == "string" &&
			typeof value.email == "string" &&
			(Merchant.is(value.merchant) || Array.isArray(value.merchant) && value.merchant.every(Merchant.is))
	}
}
