import * as model from "../index"
describe("PaymentOption", () => {
	it("Card", async () => {
		const option: model.PaymentOption.Card = {
			type: "card",
			service: "cardfunc",
			schemes: ["visa", "mastercard", "maestro", "electron", "amex"],
			amount: 13.37,
			currency: "USD",
		}
		expect(model.PaymentOption.is(option))
		expect(model.PaymentOption.Card.is(option))
	})
})
