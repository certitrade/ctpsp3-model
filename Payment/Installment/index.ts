import { Base } from "../Base"
import { Plan as InstallmentPlan } from "./Plan"
import { Creatable as InstallmentCreatable } from "./Creatable"

export interface Installment extends Base {
	type: "installment",
	plan: InstallmentPlan
}

export namespace Installment {
	export function is(value: any | Installment): value is Installment {
		return typeof(value) == "object" &&
			value.method == "installment" &&
			InstallmentPlan.is(value.plan) &&
			Base.is(value)
	}
	export type Creatable = InstallmentCreatable
	export namespace Creatable {
		// tslint:disable-next-line: no-shadowed-variable
		export const is = InstallmentCreatable.is
	}
	export type Plan = InstallmentPlan
	export namespace Plan {
		// tslint:disable-next-line:no-shadowed-variable
		export const is = InstallmentPlan.is
	}
}
