import { PaymentOption } from "./PaymentOption"
import { InstallmentPlan } from "./InstallmentPlan"

export interface Installment extends PaymentOption {
	type: "installment"
	plans: InstallmentPlan[]
}

export namespace Installment {
	export function is(value: any | Installment): value is Installment {
		return PaymentOption.is(value) &&
			value.type == "installment"
	}
	export type Plan = InstallmentPlan
}
