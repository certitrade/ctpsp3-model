export type Content = number | string | boolean | Content[] | { [property: string]: Content } | null | undefined

export namespace Content {
	export function is(value: Content | any): value is Content {
		return typeof value == "number" ||
			typeof value == "string" ||
			typeof value == "boolean" ||
			Array.isArray(value) && value.every(is) ||
			typeof value == "object" && Object.values(value).every(is) ||
			value == null ||
			value == undefined
	}
	export function freeze(value: Content): Content {
		return JSON.parse(JSON.stringify(value))
	}
}
