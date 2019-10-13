import { Verify } from "../Verify"
import { Plan } from "./Plan"
import { CreatableBase } from "../CreatableBase"

export interface Creatable extends CreatableBase {
	type: "installment"
	plan: Plan
	verify: Verify
}

export namespace Creatable {
	export function is(value: any | Creatable): value is Creatable {
		return typeof value == "object" &&
			value.type == "installment" &&
			Plan.is(value.plan) &&
			Verify.is(value.verify) &&
			CreatableBase.is(value)
	}
}
