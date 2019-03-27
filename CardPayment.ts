import { Payment } from "./Payment"
export interface CardPayment extends Payment {
	method: "card"
	cardHolder?: string
	cardNumber?: string
	cardCvc?: string
	cardExpires?: [number, number]
}
export namespace CardPayment {
	export function is(payment: CardPayment | any): payment is CardPayment {
		return payment.method == "card" &&
			(typeof(payment.cardNumber) == "string" || payment.cardNumber == undefined) &&
			(typeof(payment.cardCvc) == "string" || payment.cardCvc == undefined) &&
			(Array.isArray(payment.cardExpires) && payment.cardExpires.length == 2 && typeof(payment.cardExpires[0]) == "number" && typeof(payment.cardExpires[1]) == "number" || payment.expires == undefined) &&
			Payment.is(payment)
}
	export function isComplete(payment: CardPayment | any): payment is (CardPayment & { cardNumber: string, cardCvc: string, cardExpires: [number, number] }) {
		return is(payment) &&
			payment.cardNumber != undefined &&
			payment.cardCvc != undefined &&
			payment.cardExpires != undefined
	}
}
