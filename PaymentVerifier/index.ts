import * as authly from "authly"
import { Request as PRequest } from "./Request"
import { Response as PResponse } from "./Response"
import { Error as ResponseError } from "./Response/Error"
import { Unverified as ResponseUnverified } from "./Response/Unverified"
import { VerificationRequired as ResponseVerificationRequired } from "./Response/VerificationRequired"
import { Verified as ResponseVerified } from "./Response/Verified"

export abstract class PaymentVerifier {
	abstract async verify(
		key: authly.Token,
		request: PRequest,
		force?: boolean,
		logFunction?: (step: string, level: "trace" | "debug" | "warning" | "error" | "fatal", content: any) => void
	): Promise<PResponse>
}
export namespace PaymentVerifier {
	export type Request = PRequest
	export namespace Request {
		export const create = PRequest.create
	}
	export type Response = PResponse
	export namespace Response {
		export type Unverified = PResponse.Unverified
		export namespace Unverified {
			export const is = ResponseUnverified.is
		}
		export type Verified = PResponse.Verified
		export namespace Verified {
			export const is = ResponseVerified.is
		}
		export type VerificationRequired = PResponse.VerificationRequired
		export namespace VerificationRequired {
			export const is = ResponseVerificationRequired.is
			export const isVerificationError = ResponseVerificationRequired.isVerificationError
			export const isCardVerificationError = ResponseVerificationRequired.isCardVerificationError
		}
		export type Error = PResponse.Error
		export namespace Error {
			export const is = ResponseError.is
		}
		export const verified = PResponse.verified
		export const unverified = PResponse.unverified
		export const verificationRequired = PResponse.verificationRequired
		export const error = PResponse.error
	}
}
