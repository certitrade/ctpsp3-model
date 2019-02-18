import { Address } from "./Address"

export interface Addresses {
	primary?: Address
	billing?: Address
	delivery?: Address
	visit?: Address
}
// tslint:disable-next-line: no-namespace
export namespace Addresses {
	export const types: [ "primary", "billing", "delivery", "visit" ] = [ "primary", "billing", "delivery", "visit" ]
	export function is(value: any | Addresses): value is Addresses {
		return (Address.is(value.primary) || value.primary == undefined) &&
			(Address.is(value.billing) || value.billing == undefined) &&
			(Address.is(value.delivery) || value.delivery == undefined) &&
			(Address.is(value.visit) || value.visit == undefined)
	}
	export function map<T>(addresses: Addresses, mapping: (type: string, address: Address) => T): T[] {
		return types.filter(type => addresses[type] != undefined).map(type => mapping(type, addresses[type]!))
	}
}
