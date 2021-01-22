import * as gracely from "gracely"
import * as authly from "authly"
import { Base } from "./Base"
import { Error as RError } from "./Error"
import { Unverified as RUnverified } from "./Unverified"
import { VerificationRequired as RVerificationRequired } from "./VerificationRequired"
import { Verified as RVerified } from "./Verified"

export type Response = Base

export namespace Response {
	export function verified(token?: authly.Token): Verified {
		return new RVerified(token)
	}
	export function unverified(): Unverified {
		return new RUnverified()
	}
	export function verificationRequired(
		visible: boolean,
		method: "GET" | "POST",
		url: string,
		data?: { [property: string]: string }
	): VerificationRequired {
		return new RVerificationRequired(visible, method, url, data)
	}
	export function error(e: gracely.Error): Error {
		return new RError(e)
	}
	export type Unverified = RUnverified
	export namespace Unverified {
		export const is = RUnverified.is
	}
	export type Verified = RVerified
	export namespace Verified {
		export const is = RVerified.is
	}
	export type VerificationRequired = RVerificationRequired
	export namespace VerificationRequired {
		export const is = RVerificationRequired.is
	}
	export type Error = RError
	export namespace Error {
		export const is = RError.is
	}
}
