import { Browser } from "../../../../Browser"
export interface Token {
	type: "token"
	card: string
	client?: { ip?: string; browser?: Browser | Browser.Creatable }
}

export namespace Token {
	export function is(value: Token | any): value is Token {
		return (
			typeof value == "object" &&
			value.type == "token" &&
			typeof value.card == "string" &&
			(value.client == undefined ||
				(typeof value.client == "object" &&
					(value.client.ip == undefined || typeof value.client.ip == "string") &&
					(value.client.browser == undefined ||
						Browser.is(value.client.browser) ||
						Browser.Creatable.is(value.client.browser))))
		)
	}
}
