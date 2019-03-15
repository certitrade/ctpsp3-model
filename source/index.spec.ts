import * as model from "."

describe("namespacing", () => {
	it("Error", async () => {
		const e = model.Error.client.missingQueryArgument("name", "string", "name of product")
		const f: model.Error = e
		expect(e).toBeTruthy()
		expect(f).toBeTruthy()
		expect(model.Error.client.missingQueryArgument.is(e)).toBeTruthy()
		expect(e.response).toEqual({
			"status": 400,
			"headers": {
				"content-type": "application/json; charset=utf-8",
			},
			"body": {
				"status": 400,
				"type": "missing query argument",
				"argument": {
					"name": "name",
					"type": "string",
					"description": "name of product",
				},
			},
		})
	})
	it("PaymentOption", async () => {
		const option: model.PaymentOption.Card = { type: "card", service: "certitrade", issuers: [ "visa", "mastercard", "maestro", "electron", "amex" ]}
		expect(model.PaymentOption.is(option))
		expect(model.PaymentOption.Card.is(option))
	})
})
