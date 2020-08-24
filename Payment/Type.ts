export type Type = "card" | "invoice" | "installment" | "direct" | "swish" | "defer" | "account"

export namespace Type {
	export function is(value: any | Type): value is Type {
		return (
			typeof value == "string" &&
			(value == "card" ||
				value == "invoice" ||
				value == "installment" ||
				value == "direct" ||
				value == "swish" ||
				value == "defer" ||
				value == "account")
		)
	}
}
