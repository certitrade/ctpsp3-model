import * as selectively from "selectively"

export type Frequency = "yearly" | "quarterly" | "monthly" | "weekly" | "daily"

export namespace Frequency {
	export const types = ["yearly", "quarterly", "monthly", "weekly", "daily"]
	export function is(value: any | Frequency): value is Frequency {
		return types.some(v => value == v)
	}
	export const template = new selectively.Type.Union([
		new selectively.Type.String("yearly"),
		new selectively.Type.String("quarterly"),
		new selectively.Type.String("monthly"),
		new selectively.Type.String("weekly"),
		new selectively.Type.String("daily"),
	])
}
