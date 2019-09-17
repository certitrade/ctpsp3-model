import * as gracely from "gracely"
import { Base } from "./Base"

export interface Fail extends Base {
	type: "fail"
	error?: gracely.Error
}

export namespace Fail {
	export function is(value: Fail | any): value is Fail {
		return Base.is(value) && value.type == "fail"
	}
}
