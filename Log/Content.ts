export type Content = number | string | boolean | Content[] | { [property: string]: Content } | null

export namespace Content {
	export function is(value: Content | any): value is Content {
		return typeof value == "number" ||
			typeof value == "string" ||
			typeof value == "boolean" ||
			Array.isArray(value) && value.every(is) ||
			typeof value == "object" && Object.values(value).every(is) ||
			value == null
	}
}