import { Address as Parent } from "./Address"
import { SE as AddressSE } from "./SE"
import { FI as AddressFI } from "./FI"

export type Address = Parent
export namespace Address {
	export const is = Parent.is
	export type SE = AddressSE
	export type FI = AddressFI
}
