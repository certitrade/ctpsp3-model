import { DateTime } from "isoly"

export interface Terms {
	due: DateTime | number // date or number of days
	fee: number // invoice fee in selected currency
}

export namespace Terms {
	export function is(value: any | Terms): value is Terms {
		return typeof(value) == "object" &&
			(DateTime.is(value.due) || typeof(value.due) == "number") &&
			typeof(value.fee) == "number"
	}
}
