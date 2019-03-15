export interface InstallmentPlan {
	id: string
	length: number
	fees: {
		initial: number,
		reaccuring: number,
		annualRate: number,
	}
	amount: number
	effectiveRate: number
	terms: string
}
