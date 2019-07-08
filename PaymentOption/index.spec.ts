import * as model from "../"
describe("PaymentOption", () => {
	it("Card", async () => {
		const option: model.PaymentOption.Card = { type: "card", service: "cardfunc", issuers: [ "visa", "mastercard", "maestro", "electron", "amex" ], create: { location: "https://api.example.com/payment" }, amount: 13.37, currency: "USD" }
		expect(model.PaymentOption.is(option))
		expect(model.PaymentOption.Card.is(option))
	})
})
