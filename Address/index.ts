import { CountryCode } from "isoly"
import { SE as AddressSE } from "./SE"
import { FI as AddressFI } from "./FI"

export type Address = AddressFI | AddressSE
export namespace Address {
	export function is(value: any | Address): value is Address {
		return (
			typeof value == "object" &&
			CountryCode.Alpha2.is(value.countryCode) &&
			(
				value.countryCode == "FI" && AddressFI.is(value) ||
				value.countryCode == "SE" && AddressSE.is(value) ||
				value.countryCode != "FI" && value.countryCode != "SE")
		)
	}
	export function create(countryCode: CountryCode.Alpha2): Address {
		let result: Address
		switch (countryCode) {
			case "FI": result = AddressFI.create(); break
			default: case "SE": result = AddressSE.create(); break
		}
		return result
	}
	export type FI = AddressFI
	export namespace FI {
		export const is = AddressFI.is
		export const create = AddressFI.create
	}
	export type SE = AddressSE
	export namespace SE {
		export const is = AddressSE.is
		export const create = AddressSE.create
	}
}
