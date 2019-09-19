export type Status =
	"created" |
	"ordered" |
	"cancelled" |
	"expired"

export namespace Status {
	export function is(value: any | Status): value is Status {
		return typeof value == "string" && (
				value == "created" ||
				value == "ordered" ||
				value == "cancelled" ||
				value == "expired"
			)
	}
}
