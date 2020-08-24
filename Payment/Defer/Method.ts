export type Method = "sms" | "email"

export namespace Method {
	export function is(value: any | Method): value is Method {
		return typeof value == "string" && (value == "sms" || value == "email")
	}
}
