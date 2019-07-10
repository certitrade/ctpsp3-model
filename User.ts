import * as authly from "authly"

export interface User {
	id: string
	email: string
	merchant: UserMerchant | UserMerchant[]
}

export namespace User {
	export function is(value: any | User): value is User {
		return typeof(value) == "object" &&
			typeof(value.id) == "string" &&
			typeof(value.email) == "string" &&
			(isUserMerchant(value.merchant) || isUserMerchants(value.merchant))
	}
}

interface UserMerchant {
	id: string
	name: string
	configuration: { private: authly.Token }
}
function isUserMerchant(value: any | UserMerchant): value is UserMerchant {
	return typeof(value) == "object" &&
		typeof(value.id) == "string" &&
		typeof(value.name) == "string" &&
		typeof(value.configuration) == "object" &&
		authly.Token.is(value.configuration.private)
}
function isUserMerchants(value: any | UserMerchant[]): value is UserMerchant[] {
	return Array.isArray(value) &&
		value.every(isUserMerchant)
}
