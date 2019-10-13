import { Base } from "../Base"
import { Verify } from "../Verify"
import { Plan as InstallmentPlan } from "./Plan"
import { Creatable as InstallmentCreatable } from "./Creatable"

export interface Installment extends Base {
	type: "installment"
	plan: InstallmentPlan
	verify?: Verify & { url: string }
}

export namespace Installment {
	export function is(value: any | Installment): value is Installment {
		return typeof value == "object" &&
			value.method == "installment" &&
			InstallmentPlan.is(value.plan) &&
			(value.verify == undefined || typeof value.verify == "string") &&
			(value.verify == undefined || Verify.is(value.verify) && typeof value.verify.url == "string") &&
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
