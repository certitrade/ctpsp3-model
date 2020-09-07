export type Method = "sms" | "email" | "link"

export namespace Method {
	export const types: Method[] = ["sms", "email", "link"]
	export function is(value: any | Method): value is Method {
		return typeof value == "string" && types.some(v => v == value)
	}
}
