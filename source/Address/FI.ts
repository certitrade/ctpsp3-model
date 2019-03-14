import { Address } from "./Address"

export interface FI extends Address {
	street: string
	zipCode: string
	city: string
}
export namespace FI {
	export function is(value: any | FI): value is FI {
		return typeof(value.street) == "string" &&
			typeof(value.zipCode) == "string" &&
			typeof(value.city) == "string" &&
			Address.is(value) &&
			value.countryCode == "FI"
	}
}
