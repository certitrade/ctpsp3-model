export interface Address {
	street: string
	zipCode: string
	city: string
	country: string
}
// tslint:disable-next-line: no-namespace
export namespace Address {
	export function is(value: any | Address): value is Address {
		return typeof(value.street) == "string" &&
			typeof(value.zipCode) == "string" &&
			typeof(value.city) == "string" &&
			typeof(value.country) == "string"
	}
}
