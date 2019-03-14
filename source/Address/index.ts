import { Address as Parent } from "./Address"
import { SE as AddressSE } from "./SE"

export type Address = Parent
export namespace Address {
	export const is = Parent.is
	export type SE = AddressSE
}
