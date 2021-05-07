import * as isoly from "isoly"

export type Verification =
	| {
			type: "pares"
			data: Pares
	  }
	| {
			type: "method"
			data: { threeDSServerTransID: string }
	  }
	| {
			type: "challenge"
			data: { threeDSServerTransID: string; dsTransID: string }
	  }

export interface Pares {
	cavv: string
	xid: string
	eci: "0" | "1" | "2" | "5" | "6" | "7"
	status: "Y" | "U" | "A" | "N"
	amount?: number
	cavv_algorithm?: string
	currency?: isoly.Currency
	last4?: string
	merchant_id?: string
}
