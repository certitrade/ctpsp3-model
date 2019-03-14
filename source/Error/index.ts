import { Error as Parent } from "./Error"
import { Response as ResponseClass } from "./Response"
import * as clientErrors from "./client"

export type Error = Parent
export namespace Error {
	export const is = Parent.is
	export type Response = ResponseClass
	export const client = clientErrors
}
