import * as model from "../"
describe("PaymentOption", () => {
	it("Card", async () => {
		const option: model.PaymentOption.Card = { type: "card", service: "certitrade", issuers: [ "visa", "mastercard", "maestro", "electron", "amex" ]}
		expect(model.PaymentOption.is(option))
		expect(model.PaymentOption.Card.is(option))
	})
})
