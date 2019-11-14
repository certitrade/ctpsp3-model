import * as card from "@cardfunc/model"
import { Base } from "../Base"
import { Creatable as SwishCreatable } from "./Creatable"

export interface Swish extends Base {
	type: "swish"
}

export namespace Swish {
	export function is(value: any | Swish): value is Swish {
		return typeof value == "object" &&
			value.type == "swish" &&
			Base.is(value)
	}
	export type Creatable = SwishCreatable
	export namespace Creatable {
// tslint:disable-next-line: no-shadowed-variable
		export const is = SwishCreatable.is
		export const flaw = SwishCreatable.flaw
	}
}
