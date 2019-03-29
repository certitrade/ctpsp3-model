import { Address } from "./Address"
import { Addresses } from "./Addresses"
import { EmailAddresses } from "./EmailAddresses"
import { Name } from "./Name"
import { IdentityNumber } from "./IdentityNumber"
import { PhoneNumbers } from "./PhoneNumbers"

export interface Customer {
	type?: "organization" | "person"
	identityNumber?: IdentityNumber
	id?: string
	name?: string | Name
	address?: Address | Addresses
	email?: string | EmailAddresses
	phone?: string | PhoneNumbers
}
export namespace Customer {
	export function is(value: any | Customer): value is Customer {
		return typeof(value) == "object" &&
			(value.type == "organization" || value.type == "person" || value.type == undefined) &&
			(IdentityNumber.is(value.identityNumber) || value.identityNumber == undefined) &&
			(typeof(value.id) == "string" || value.id == undefined) &&
			(typeof(value.name) == "string" || Name.is(value.name) || value.name == undefined) &&
			(Address.is(value.address) || Addresses.is(value.address) || value.address == undefined) &&
			(typeof(value.email) == "string" || EmailAddresses.is(value.email) || value.email == undefined) &&
			(typeof(value.phone) == "string" || PhoneNumbers.is(value.phone) || value.phone == undefined)
	}
}
