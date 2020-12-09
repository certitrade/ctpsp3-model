import * as isoly from "isoly"
import * as model from "../index"
import { Creatable as BalanceCreatable } from "./Creatable"
import { Schedule } from "../Schedule"

export interface Balance extends BalanceCreatable {
	items: model.Item[]
	total: number
	due: isoly.Date
}

export namespace Balance {
	export function is(value: any | Balance): value is Balance {
		return (
			typeof value == "object" &&
			Array.isArray(value.items) &&
			value.items.every(model.Item.is) &&
			typeof value.total == "number" &&
			BalanceCreatable.is(value)
		)
	}
	export function create(creatable: BalanceCreatable): Balance {
		return { ...creatable, items: [], total: 0, due: Schedule.next(creatable.schedule, isoly.Date.now()) }
	}
	export function update(balance: Balance, update: Partial<BalanceCreatable>): Balance {
		return {
			...balance,
			limit: update.limit ?? balance.limit,
			schedule: update.schedule ?? balance.schedule,
			currency: update.currency ?? balance.currency,
		}
	}
	export type Creatable = BalanceCreatable
	export namespace Creatable {
		export const is = BalanceCreatable.is
	}
}
