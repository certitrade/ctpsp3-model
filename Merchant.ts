import { Configuration } from "./Configuration"

export interface Merchant {
	id: string;
	name: string;
	configuration: {
		production?: Configuration,
		test?: Configuration,
	}
}
export namespace Merchant {
	export function is(value: any | Merchant): value is Merchant {
		return typeof(value) == "object" &&
			typeof(value.id) == "string" &&
			typeof(value.configuration) == "object" &&
			(value.configuration.production == undefined || Configuration.is(value.configuration.production)) &&
			(value.configuration.test == undefined || Configuration.is(value.configuration.test)) &&
			(value.configuration.production || value.configuration.test)
	}
}
