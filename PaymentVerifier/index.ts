import * as authly from "authly"
import { Request as PRequest } from "./Request"
import { Response as PResponse } from "./Response"

export abstract class PaymentVerifier {
	abstract verify(key: authly.Token, request: PRequest, force?: boolean): PResponse
}
export namespace PaymentVerifier {
	export type Request = PRequest
	export namespace Request {
		export const create = PRequest.create
	}
	export type Response = PResponse
	export namespace Response {
		export const verified = PResponse.verified
		export const unverified = PResponse.unverified
		export const verificationRequired = PResponse.verificationRequired
		export const error = PResponse.error
	}
}
