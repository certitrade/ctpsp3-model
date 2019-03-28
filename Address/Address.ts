import { CountryCode } from "isoly"
export interface Address {
	countryCode: CountryCode.Alpha2
}
export namespace Address {
	export function is(value: any | Address): value is Address {
		return typeof(value.country) == "string"
	}
}
