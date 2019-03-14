import { Address } from "./Address"

export interface SE extends Address {
	street: string
	zipCode: string
	city: string
}
export namespace SE {
	export function is(value: any | SE): value is SE {
		return typeof(value.street) == "string" &&
			typeof(value.zipCode) == "string" &&
			typeof(value.city) == "string" &&
			Address.is(value) &&
			value.countryCode == "SE"
	}
}
