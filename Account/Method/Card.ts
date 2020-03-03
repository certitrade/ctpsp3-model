import * as authly from "authly"
import * as gracely from "gracely"
import { Card as PCard } from "../../Payment/Card"
import { Base } from "./Base"

export interface Card extends Base {
	reference: authly.Token
	scheme: PCard.Scheme
	iin: string
	last4: string
	expires: PCard.Expires
}

// tslint:disable: no-shadowed-variable
export namespace Card {
	export function is(value: Card | any): value is Card {
		return typeof value == "object" &&
			authly.Token.is(value.reference) &&
			PCard.Scheme.is(value.scheme) &&
			typeof value.iin == "string" && value.iin.length == 6 &&
			typeof value.last4 == "string" && value.last4.length == 4 &&
			PCard.Expires.is(value.expires) &&
			Base.is(value)
	}
	export function flaw(value: Base | any): gracely.Flaw {
		return {
			type: "model.Account.Base",
			flaws: typeof value != "object" ? undefined :
				[
					authly.Token.is(value.reference) || { property: "reference", type: "authly.Token" },
					PCard.Scheme.is(value.scheme) || { property: "scheme", type: "Payment.Card.Scheme" },
					typeof value.iin == "string" && value.iin.length == 6 || { property: "iin", type: "string" },
					typeof value.last4 == "string" && value.last4.length == 4 || { property: "last4", type: "string" },
					PCard.Expires.is(value.expires) || { property: "expires", type: "Payment.Card.Expires" },
					Base.is(value) || { ...Base.flaw(value) }
				].filter(gracely.Flaw.is) as gracely.Flaw[],
		}
	}
}
