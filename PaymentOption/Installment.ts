import { Base } from "./Base"
import { Plan as InstallmentPlan } from "../Payment/Installment/Plan"

export interface Installment extends Base {
	type: "installment"
	plans: InstallmentPlan[]
}

export namespace Installment {
	export function is(value: any | Installment): value is Installment {
		return Base.is(value) && value.type == "installment"
	}
}
