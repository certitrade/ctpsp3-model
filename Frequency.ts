export type Frequency = "yearly" | "quarterly" | "monthly" | "weekly" | "daily"

export namespace Frequency {
	export const types = ["yearly", "quarterly", "monthly", "weekly", "daily"]
	export function is(value: any | Frequency): value is Frequency {
		return types.some(v => value == v)
	}
}
