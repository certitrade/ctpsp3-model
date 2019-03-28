import { CountryCode } from "../CountryCode"
export interface Address {
	countryCode: CountryCode
}
export namespace Address {
	export function is(value: any | Address): value is Address {
		return typeof(value.country) == "string"
	}
}
