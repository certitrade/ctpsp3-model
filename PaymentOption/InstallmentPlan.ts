export interface InstallmentPlan {
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
	terms: string
}
