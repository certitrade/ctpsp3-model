export type Type =
	"card" |
	"invoice" |
	"installment" |
	"direct" |
	"mobile" |
	"defer"

export namespace Type {
	export function is(value: any | Type): value is Type {
		return typeof value == "string" && (
			value == "card" ||
			value == "invoice" ||
			value == "installment" ||
			value == "direct" ||
			value == "mobile" ||
			value == "defer"
		)
	}
}
