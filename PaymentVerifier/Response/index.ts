import * as gracely from "gracely"
import { Base } from "./Base"
import { Unverified as RUnverified } from "./Unverified"
import { Verified as RVerified } from "./Verified"
import { VerificationRequired as RVerificationRequired } from "./VerificationRequired"
import { Error as RError } from "./Error"

export type Response = Base

export namespace Response {
	export function verified(): Verified {
		return new RVerified()
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
	export type Verified = RVerified
	export type VerificationRequired = RVerificationRequired
	export type Error = RError
}
