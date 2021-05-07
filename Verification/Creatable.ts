import * as isoly from "isoly"
import * as authly from "authly"
import * as modelCard from "@payfunc/model-card"
import * as model from "../index"

export interface Creatable {
	card: modelCard.Card.Creatable | authly.Token
	//id: authly.Identifier
	number?: string
	currency: isoly.Currency
	items: number | model.Item | model.Item[]
	recurring?: "initial" | "recurring"
	customer?: model.Customer
	browser?: Browser
	response?: { pares: string } | { cres: string } | { ares: string }
}
// export interface Cretable3d {
// 	card: authly.Token | model.Card.Creatable
// 	// id would be generated when created. transaction flow tracked through decoded pares.xid, decoded method.threeDSServerTransID or challenge.threeDSServerTransID
// 	number: string
// 	currency: isoly.Currency
// 	items: number | model.Item | model.Item[]
// 	recurring?: "initial" | "subsequent"
// 	customer?: model.Customer
// 	response?: { pares: string } | { method: string } | { challenge: string }
// }

// export namespace Payload {
// 	export function from(
// 		payload: (model.Account.Creatable | model.Order | model.Order.Creatable) & {
// 			id: authly.Identifier
// 			payment: model.Payment.Card.Creatable & { card: authly.Token }
// 		},
// 		type: "create account" | "account" | "card"
// 	): Payload {
// 		return {
// 			id: payload.id,
// 			amount: model.Item.amount(model.Account.Creatable.is(payload) ? 0 : payload.items),
// 			currency: payload.payment.currency ?? payload.currency ?? "EUR",
// 			payment: payload.payment,
// 			type,
// 			customer: payload.customer,
// 			number: payload.number,
// 		}
// 	}
// }
