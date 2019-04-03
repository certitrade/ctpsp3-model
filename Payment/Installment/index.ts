import { Plan as InstallmentPlan } from "./Plan"
import { Base } from "../Base"

export interface Installment extends Base {
	method: "installment",
	plan: InstallmentPlan
}

export namespace Installment {
	export function is(value: any | Installment): value is Installment {
		return typeof(value) == "object" &&
			value.method == "installment" &&
			InstallmentPlan.is(value.plan) &&
			Base.is(value)
	}
	export type Plan = InstallmentPlan
	export namespace Plan {
		// tslint:disable-next-line:no-shadowed-variable
		export const is = InstallmentPlan.is
	}
}
