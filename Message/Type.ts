export type Type = "receipt" | "suspension" | "pending"

export namespace Type {
	export const types: Type[] = ["receipt", "suspension", "pending"]
	export function is(value: Type | any): value is Type {
		return types.some(v => v == value)
	}
}
