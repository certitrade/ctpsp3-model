export interface Address {
	countryCode: "SE"
}
export namespace Address {
	export function is(value: any | Address): value is Address {
		return typeof(value.country) == "string"
	}
}
