import { Address } from "./Address"

export interface Addresses {
	primary?: Address
	billing?: Address
	delivery?: Address
	visit?: Address
}
// tslint:disable-next-line: no-namespace
export namespace Addresses {
	export function is(value: any | Addresses): value is Addresses {
		return (Address.is(value.primary) || value.primary == undefined) &&
			(Address.is(value.billing) || value.billing == undefined) &&
			(Address.is(value.delivery) || value.delivery == undefined) &&
			(Address.is(value.visit) || value.visit == undefined)
	}
}
