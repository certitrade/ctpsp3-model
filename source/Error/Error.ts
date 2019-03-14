export interface Error {
	status: number
	type: string
}
export namespace Error {
	export function is(value: any | Error): value is Error {
		return typeof(value) == "object" &&
			typeof(value.status) == "number" && value.status >= 400 &&
			typeof(value.type) == "string"
	}
}

// model3.error.client.missingQueryArgument("a").response
