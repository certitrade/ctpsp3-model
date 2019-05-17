import * as model from "./"

describe("Order", () => {
	const order: model.Order = {
		id: "5cdacdb69126ef507c9251b3",
		number: "1",
		client: "42233c81-caf1-44f7-821e-7a28c6198ebc",
		created: "2019-01-31T20:01:34",
		customer: {
			id: "999999999",
			type: "person",
			identityNumber: "195505103613",
			name: "Maria Mullbär",
			address: {
				street: "Rosenborgsgatan 4",
				zipCode: "16993",
				city: "SOLNA",
				countryCode: "SE",
			},
		},
		items: [
			{
				name: "Basic T-shirt, black",
				price: 119.6,
				quantity: 2,
				vat: 29.9,
				status: [
					"charged",
					"charged",
				],
			},
		],
		currency: "SEK",
		payment: {
			id: "07df5b95-9e93-4a23-8175-4a5ea7896cd1",
			type: "card",
			issuer: "amex",
			service: "Certitrade",
			created: "2019-01-31T20:00:54",
			amount: 100,
			currency: "SEK",
		},
		attempt: [],
		event: [
			{
				type: "charge",
				items: [
					{
						name: "Basic T-shirt, black",
						price: 119.6,
						quantity: 2,
						vat: 29.9,
					},
				],
				date: "2019-02-01T12:00:00",
			},
		],
		status: [
				"charged",
		],
	}
	const orders: model.Order[] = [
		order,
		order,
	]
	it("is", () => expect(model.Order.is(order)).toBeTruthy())
	it("set status", () => expect(model.Order.setStatus(order)).toBeTruthy())
})
