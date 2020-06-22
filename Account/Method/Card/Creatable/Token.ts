export interface Token {
	type: "token"
	card: string
}

// tslint:disable: no-shadowed-variable
export namespace Token {
	export function is(value: Token | any): value is Token {
		return typeof value == "object" &&
			value.type == "token" &&
			typeof value.card == "string"
	}
}
