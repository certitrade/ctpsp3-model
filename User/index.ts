import { Creatable as UserCreatable } from "./Creatable"

export interface User extends UserCreatable {
	id: string
}

export namespace User {
	export function is(value: any | User): value is User {
		return typeof value == "object" &&
			typeof value.id == "string" &&
			UserCreatable.is(value)
	}
	export type Creatable = UserCreatable
	export namespace Creatable {
		// tslint:disable-next-line: no-shadowed-variable
		export const is = UserCreatable.is
		export const flaw = UserCreatable.flaw
	}
}
