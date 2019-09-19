import * as gracely from "gracely"
import { Address } from "../Address"
import { Addresses } from "../Addresses"
import { EmailAddresses } from "../EmailAddresses"
import { Name } from "../Name"
import { IdentityNumber } from "../IdentityNumber"
import { PhoneNumbers } from "../PhoneNumbers"
import { Required as RequiredType  } from "./Required"

export interface Customer {
	type: "organization" | "person"
	identityNumber?: IdentityNumber
	id: string
	number?: string
	name: string | Name
	address: Address | Addresses
	email?: string | EmailAddresses
	phone?: string | PhoneNumbers
}
export namespace Customer {

	export function is(value: any | Customer): value is Customer {
		return typeof value == "object" &&
			(value.type == "organization" || value.type == "person") &&
			(IdentityNumber.is(value.identityNumber) || value.identityNumber == undefined) &&
			(typeof value.id == "string") &&
			(typeof value.number == "string" || value.number == undefined) &&
			(typeof value.name == "string" || Name.is(value.name)) &&
			(Address.is(value.address) || Addresses.is(value.address)) &&
			(typeof value.email == "string" || EmailAddresses.is(value.email) || value.email == undefined) &&
			(typeof value.phone == "string" || PhoneNumbers.is(value.phone) || value.phone == undefined)
	}
	export function flaw(value: any | Customer): gracely.Flaw {
		return {
			type: "model.Customer",
			flaws: typeof value != "object" ? undefined :
				[
					value.type == "organization" || value.type == "person" || { property: "type", type: '"organization" | "person"' },
					value.identityNumber == undefined || IdentityNumber.is(value.identityNumber) || { property: "identityNumber", type: "IdentityNumber | undefined" },
					typeof value.id == "string" || { property: "id", type: "string" },
					value.number == undefined || typeof value.number == "string" || { property: "number", type: "string | undefined" },
					typeof value.name == "string" || Name.is(value.name) || { property: "name", type: "string | Name" },
					Address.is(value.address) ||  Addresses.is(value.address) || { property: "address", type: "Address | Addresses" },
					value.email == undefined || typeof value.email == "string" || EmailAddresses.is(value.email) || { property: "email", type: "string | EmailAddresses | undefined" },
					value.phone == undefined || typeof value.phone == "string" || PhoneNumbers.is(value.phone) || { property: "phone", type: "string | PhoneNumbers | undefined" },
				].filter(gracely.Flaw.is) as gracely.Flaw[],
		}
	}
	export type Required = RequiredType
	export namespace Required {
		export const is = RequiredType.is
	}
	
}
