import { Address as Parent } from "./Address"
import { SE as AddressSE } from "./SE"
import { FI as AddressFI } from "./FI"

export type Address = Parent
// tslint:disable: no-shadowed-variable
export namespace Address {
	export const is = Parent.is
	export type SE = AddressSE
	export namespace SE {
		export const is = AddressSE.is
	}
	export type FI = AddressFI
	export namespace FI {
		export const is = AddressFI.is
	}
}
