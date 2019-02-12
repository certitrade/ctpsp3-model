import { Payment, isPayment } from "./Payment"

export interface CardPayment extends Payment {
	method: "card"
	cardHolder?: string
	cardNumber?: string
	cardCvc?: string
	cardExpires?: [number, number]
}

export function isCardPayment(payment: CardPayment | any): payment is CardPayment {
	return isPayment(payment) && payment.method == "card"
}

export function isCompleteCardPayment(payment: CardPayment | any): payment is (CardPayment & { cardNumber: string, cardCvc: string, cardExpires: [number, number] }) {
	return isCardPayment(payment) &&
		typeof(payment.cardNumber) == "string" &&
		typeof(payment.cardCvc) == "string" &&
		Array.isArray(payment.cardExpires) &&
		payment.cardExpires.length == 2 &&
		typeof(payment.cardExpires[0]) == "number" &&
		typeof(payment.cardExpires[1]) == "number"
}
