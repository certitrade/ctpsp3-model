export type Method = "sms" | "email" | "link"

export namespace Method {
	export function is(value: any | Method): value is Method {
		return typeof value == "string" && (value == "sms" || value == "email" || value == "link")
	}
}
