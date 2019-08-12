import { DateTime } from "isoly"
import * as gracely from "gracely"

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
	export function flaw(value: any | Terms): gracely.Flaw {
		return {
			type: "model.Payment.Invoice.Terms",
			flaws: typeof(value) != "object" ? undefined :
				[
					DateTime.is(value.due) || typeof(value.due) == "number" || { property: "due", type: "DateTime | number" },
					typeof(value.fee) == "number" || { property: "fee", type: "number" },
				].filter(gracely.Flaw.is) as gracely.Flaw[],
		}
	}
}
