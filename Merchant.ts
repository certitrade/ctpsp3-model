import * as authly from "authly"
export interface Merchant {
	id: string
	configuration: {
		production?: { public: authly.Token, private: authly.Token } ,
		test?: { public: authly.Token, private: authly.Token },
	}
	users: string[]
}
export namespace Merchant {
	export function is(value: any | Merchant): value is Merchant {
		return typeof(value) == "object" &&
			typeof(value.id) == "string" &&
			typeof(value.configuration) == "object" &&
			(value.configuration.production == undefined || authly.Token.is(value.configuration.production)) &&
			(value.configuration.test == undefined || authly.Token.is(value.configuration.test)) &&
			(value.configuration.production || value.configuration.test) &&
			Array.isArray(value.users)
	}
}
