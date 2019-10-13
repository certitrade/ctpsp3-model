import { Iframe as VerifyIframe } from "./Iframe"
import { Redirect as VerifyRedirect } from "./Redirect"

export type Verify = VerifyIframe | VerifyRedirect

// tslint:disable: no-shadowed-variable
export namespace Verify {
	export function is(value: Verify | any): value is Verify {
		return Iframe.is(value) || Redirect.is(value)
	}
	export type Iframe = VerifyIframe
	export namespace Iframe {
		export const is = VerifyIframe.is
	}
	export type Redirect = VerifyRedirect
	export namespace Redirect {
		export const is = VerifyRedirect.is
	}
}
