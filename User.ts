import { Address } from "./Address"
import { Addresses } from "./Addresses"
import { EmailAddresses } from "./EmailAddresses"
import { Name } from "./Name"
import { PhoneNumbers } from "./PhoneNumbers"

export interface User {
	id: string
	number?: string
	name: string | Name
	address: Address | Addresses
	email?: string | EmailAddresses
	phone?: string | PhoneNumbers
}

export namespace User {
	export function is(value: any | User): value is User {
		return typeof(value) == "object" &&
			(value.type == "organization" || value.type == "person") &&
			(typeof(value.id) == "string") &&
			(typeof(value.number) == "string" || value.number == undefined) &&
			(typeof(value.name) == "string" || Name.is(value.name)) &&
			(Address.is(value.address) || Addresses.is(value.address)) &&
			(typeof(value.email) == "string" || EmailAddresses.is(value.email) || value.email == undefined) &&
			(typeof(value.phone) == "string" || PhoneNumbers.is(value.phone) || value.phone == undefined)
	}
}
