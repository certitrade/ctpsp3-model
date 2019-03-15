import { Type as Type } from "./Type"

export interface PaymentOption {
	type: Type
	service: string
}

export namespace PaymentOption {
	export function is(value: any | PaymentOption) {
		return typeof(value) == "object" &&
			Type.is(value.type) &&
			typeof(value.service) == "string"
	}
}
