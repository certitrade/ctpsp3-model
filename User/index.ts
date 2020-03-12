import * as gracely from "gracely"
import { Base as UserBase } from "./Base"
import { Creatable as UserCreatable } from "./Creatable"

export interface User extends UserBase {
	id: string
}

export namespace User {
	export function is(value: any | User): value is User {
		return typeof value == "object" &&
			typeof value.id == "string" &&
			UserBase.is(value)
	}
	export function flaw(value: any | User): gracely.Flaw {
		return {
			type: "model.User",
			flaws: typeof value != "object" ? undefined :
				[
					typeof value.id == "string" || { property: "id", type: "string" },
					UserBase.is(value) || { ...UserBase.flaw(value).flaws },
				]
				.filter(gracely.Flaw.is) as gracely.Flaw[],
		}
	}
	// tslint:disable: no-shadowed-variable
	export type Base = UserBase
	export namespace Base {
		export const is = UserBase.is
		export const flaw = UserBase.flaw
	}
	export type Creatable = UserCreatable
	export namespace Creatable {
		export const is = UserCreatable.is
		export const flaw = UserCreatable.flaw
	}
}
