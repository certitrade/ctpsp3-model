export interface Token {
	type: "token"
	card: string
}

export namespace Token {
	export function is(value: Token | any): value is Token {
		return typeof value == "object" && value.type == "token" && typeof value.card == "string"
	}
}
