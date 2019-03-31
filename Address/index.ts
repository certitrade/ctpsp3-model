import { CountryCode } from "isoly"
import { SE as AddressSE } from "./SE"
import { FI as AddressFI } from "./FI"

export type Address = AddressFI | AddressSE
// tslint:disable: no-shadowed-variable
export namespace Address {
	export function is(value: any | Address): value is Address {
		return typeof(value) == "object" &&
			CountryCode.Alpha2.is(value.countryCode) &&
			(
				value.countryCode == "FI" && AddressFI.is(value) ||
				value.countryCode == "SE" && AddressSE.is(value)
			)
	}
	export type SE = AddressSE
	export namespace SE {
		export const is = AddressSE.is
	}
	export type FI = AddressFI
	export namespace FI {
		export const is = AddressFI.is
	}
}
