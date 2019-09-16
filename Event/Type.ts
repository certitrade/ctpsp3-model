export type Type =
	"order" |
	"cancel" |
	"charge" |
	"pay" |
	"refund"

export const types: Type[] = [ "order", "cancel", "charge", "pay", "refund" ]

export namespace Type {
	export function is(value: any | Type): value is Type {
		return types.some(t => t == value)
	}
}
