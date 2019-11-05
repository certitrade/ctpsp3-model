export type Type =
	"defer" |
	"pend" |
	"deny" |
	"order" |
	"cancel" |
	"charge" |
	"pay" |
	"refund" |
	"fail"

export const types: Type[] = [ "defer", "pend", "deny", "order", "cancel", "charge", "pay", "refund", "fail" ]

export namespace Type {
	export function is(value: any | Type): value is Type {
		return types.some(t => t == value)
	}
}
