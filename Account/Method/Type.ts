export type Type =
	"card" | "token"

export namespace Type {
	export function is(value: any | Type): value is Type {
		return typeof value == "string" &&
			(value == "card" || value == "token")
	}
}
