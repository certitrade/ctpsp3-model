export type Method = "sms" | "email" | "link"
const types: Method[] = ["sms", "email", "link"]

export namespace Method {
	export function is(value: any | Method): value is Method {
		return typeof value == "string" && types.some(v => v == value)
	}
}
