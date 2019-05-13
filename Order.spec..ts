import * as model from "./"

describe("Order", () => {
	it("is", () => expect(model.Order.is({
		id: "123456789",
		number: "123456789-1",
		client: "123456789",
		create: "2019-01-01T01:01:01",
		customer: "123456789",
		items: [
			{
				name : "T-shirt, Red",
				price : 1000.0,
				quantity : 1.0,
				vat : 250.0,
			},
		],
		currency: "SEK",
		payment: "123456789",
		attempt: "123456789",
		event: "charge",
	})).toBeTruthy())
})
