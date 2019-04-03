export interface Plan {
	id: string
	length: number
	amount: number
	fees: {
		initial: number,
		reaccuring: number,
		annualRate: number,
	}
	total: number
	effectiveRate: number
	terms?: string
}

export namespace Plan {
	export function is(value: any | Plan): value is Plan {
		return typeof(value) == "object" &&
			typeof(value.id) == "string" &&
			typeof(value.length) == "number" &&
			typeof(value.amount) == "number" &&
			typeof(value.fees) == "object" &&
			typeof(value.fees.initial) == "number" &&
			typeof(value.fees.reaccuring) == "number" &&
			typeof(value.fees.annualRate) == "number" &&
			typeof(value.total) == "number" &&
			typeof(value.effectiveRate) == "number" &&
			(typeof(value.terms) == "string" || value.terms == undefined)
	}
}
