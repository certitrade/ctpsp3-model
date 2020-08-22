import * as model from "../index"
function getOrder(): model.Order {
	return {
		id: "01234567abcd0000",
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
				number: "ts001-b",
				name: "Basic T-shirt, black",
				price: 119.6,
				vat: 29.9,
				quantity: 2,
			},
		],
		currency: "SEK",
		payment: {
			type: "card",
			scheme: "amex",
			iin: "411111",
			last4: "1111",
			expires: [1, 20],
			service: "CardFunc",
			created: "2019-01-31T20:00:54",
			amount: 100,
			currency: "SEK",
			status: "created",
		},
	}
}
function getAmountOrder(): model.Order {
	return {
		id: "01234567abcd0000",
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
		items: 500,
		currency: "SEK",
		payment: {
			type: "card",
			scheme: "amex",
			iin: "411111",
			last4: "1111",
			expires: [2, 22],
			service: "CardFunc",
			created: "2019-01-31T20:00:54",
			amount: 500,
			currency: "SEK",
			status: "created",
		},
	}
}
function getOrders(): model.Order[] {
	return [
		{
			id: "01234567abcd0000",
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
					number: "ts001-b",
					name: "Basic T-shirt, black",
					price: 119.6,
					vat: 29.9,
					quantity: 2,
				},
			],
			currency: "SEK",
			payment: {
				type: "card",
				scheme: "amex",
				iin: "411111",
				last4: "1111",
				expires: [1, 20],
				service: "CardFunc",
				created: "2019-01-31T20:00:54",
				amount: 100,
				currency: "SEK",
				status: "created",
			},
		},
		{
			id: "01234567abcd0001",
			number: "2",
			client: "42233c81-caf1-44f7-821e-7a28c6198ebc",
			created: "2019-01-31T21:02:35",
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
					number: "ts001-c",
					name: "Slim T-shirt, purple",
					price: 119.6,
					vat: 29.9,
					quantity: 2,
				},
			],
			currency: "SEK",
			payment: {
				type: "card",
				scheme: "amex",
				iin: "411111",
				last4: "1111",
				expires: [1, 20],
				service: "CardFunc",
				created: "2019-01-31T21:01:55",
				amount: 200,
				currency: "SEK",
				status: "created",
			},
		},
	]
}
describe("Order", () => {
	it("toCsv", () =>
		expect(model.Order.toCsv(getOrder())).toEqual(
			`id,number,created,client,customer type,customer identity number,customer id,customer number,item count, item amount,currency,payment type,payment service,payment created,payment amount,payment currency,status\r\n"01234567abcd0000","1","2019-01-31T20:01:34","42233c81-caf1-44f7-821e-7a28c6198ebc","person","195505103613","999999999",,1,299,"SEK","card","CardFunc","2019-01-31T20:00:54",100,"SEK",\r\n`
		))
	it("array toCsv", () =>
		expect(model.Order.toCsv(getOrders())).toEqual(
			`id,number,created,client,customer type,customer identity number,customer id,customer number,item count, item amount,currency,payment type,payment service,payment created,payment amount,payment currency,status\r\n"01234567abcd0000","1","2019-01-31T20:01:34","42233c81-caf1-44f7-821e-7a28c6198ebc","person","195505103613","999999999",,1,299,"SEK","card","CardFunc","2019-01-31T20:00:54",100,"SEK",\r\n"01234567abcd0001","2","2019-01-31T21:02:35","42233c81-caf1-44f7-821e-7a28c6198ebc","person","195505103613","999999999",,1,299,"SEK","card","CardFunc","2019-01-31T21:01:55",200,"SEK",\r\n`
		))
	it("is", () => expect(model.Order.is(getOrder())).toBeTruthy())
	it("set status order", () =>
		expect(
			model.Order.setStatus({
				...getOrder(),
				event: [
					{
						type: "order",
						date: "2019-02-01T12:00:00",
					},
				],
			})
		).toMatchObject({
			items: {
				number: "ts001-b",
				name: "Basic T-shirt, black",
				price: 119.6,
				vat: 29.9,
				quantity: 2,
				status: ["ordered", "ordered"],
			},
			status: ["ordered"],
		}))
	it("set status order charge", () =>
		expect(
			model.Order.setStatus({
				...getOrder(),
				event: [
					{
						type: "order",
						date: "2019-02-01T12:00:00",
					},
					{
						type: "charge",
						date: "2019-02-01T12:00:00",
					},
				],
			})
		).toMatchObject({
			items: {
				number: "ts001-b",
				name: "Basic T-shirt, black",
				price: 119.6,
				vat: 29.9,
				quantity: 2,
				status: ["charged", "charged"],
			},
			status: ["charged"],
		}))
	it("set status order charge refund", () =>
		expect(
			model.Order.setStatus({
				...getOrder(),
				event: [
					{
						type: "order",
						date: "2019-02-01T12:00:00",
					},
					{
						type: "charge",
						date: "2019-02-01T12:10:00",
					},
					{
						type: "refund",
						date: "2019-02-01T12:20:00",
					},
				],
			})
		).toMatchObject({
			items: {
				number: "ts001-b",
				name: "Basic T-shirt, black",
				price: 119.6,
				vat: 29.9,
				quantity: 2,
				status: ["refunded", "refunded"],
			},
			status: ["refunded"],
		}))
	it("set status partial charge refund", () =>
		expect(
			model.Order.setStatus({
				...getOrder(),
				event: [
					{
						type: "order",
						date: "2019-02-01T12:00:00",
					},
					{
						type: "charge",
						date: "2019-02-01T12:10:00",
						items: {
							number: "ts001-b",
							name: "Basic T-shirt, black",
							price: 119.6,
							vat: 29.9,
							quantity: 1,
						},
					},
					{
						type: "refund",
						date: "2019-02-01T12:20:00",
						items: {
							number: "ts001-b",
							name: "Basic T-shirt, black",
							price: 119.6,
							vat: 29.9,
							quantity: 1,
						},
					},
					{
						type: "charge",
						date: "2019-02-01T12:10:00",
						items: {
							number: "ts001-b",
							name: "Basic T-shirt, black",
							price: 119.6,
							vat: 29.9,
							quantity: 1,
						},
					},
				],
			})
		).toMatchObject({
			items: {
				number: "ts001-b",
				name: "Basic T-shirt, black",
				price: 119.6,
				vat: 29.9,
				quantity: 2,
				status: ["refunded", "charged"],
			},
			status: ["refunded", "charged"],
		}))
	it("can't refund before charge", () =>
		expect(
			model.Order.setStatus({
				...getOrder(),
				event: [
					{
						type: "order",
						date: "2019-02-01T12:00:00",
					},
					{
						type: "refund",
						date: "2019-02-01T12:20:00",
						items: {
							number: "ts001-b",
							name: "Basic T-shirt, black",
							price: 119.6,
							vat: 29.9,
							quantity: 1,
						},
					},
					{
						type: "charge",
						date: "2019-02-01T12:10:00",
						items: {
							number: "ts001-b",
							name: "Basic T-shirt, black",
							price: 119.6,
							vat: 29.9,
							quantity: 1,
						},
					},
				],
			})
		).toMatchObject({
			items: {
				number: "ts001-b",
				name: "Basic T-shirt, black",
				price: 119.6,
				vat: 29.9,
				quantity: 2,
				status: ["charged", "ordered"],
			},
			status: ["charged", "ordered"],
		}))
	it("can only charge ordered items", () =>
		expect(
			model.Order.setStatus({
				...getOrder(),
				event: [
					{
						type: "order",
						date: "2019-02-01T12:00:00",
						items: {
							number: "ts001-b",
							name: "Basic T-shirt, black",
							price: 119.6,
							vat: 29.9,
							quantity: 1,
						},
					},
					{
						type: "charge",
						date: "2019-02-01T12:10:00",
						items: {
							number: "ts001-b",
							name: "Basic T-shirt, black",
							price: 119.6,
							vat: 29.9,
							quantity: 1,
						},
					},
					{
						type: "charge",
						date: "2019-02-01T12:10:00",
						items: {
							number: "ts001-b",
							name: "Basic T-shirt, black",
							price: 119.6,
							vat: 29.9,
							quantity: 1,
						},
					},
				],
			})
		).toMatchObject({
			items: {
				number: "ts001-b",
				name: "Basic T-shirt, black",
				price: 119.6,
				vat: 29.9,
				quantity: 2,
				status: ["charged", "created"],
			},
			status: ["charged", "created"],
		}))

	it("gets items from partial charge and refund", () =>
		expect(
			model.Order.setStatus({
				...getAmountOrder(),
				event: [
					{
						type: "order",
						date: "2019-02-01T12:00:00",
					},
					{
						type: "charge",
						date: "2019-02-01T12:10:00",
						items: 200,
					},
					{
						type: "refund",
						date: "2019-02-01T12:10:00",
						items: 50,
					},
					{
						type: "refund",
						date: "2019-02-01T12:10:00",
						items: 100,
					},
				],
			})
		).toMatchObject({
			items: [
				{
					price: 300,
					status: ["ordered"],
				},
				{
					price: 50,
					status: ["charged"],
				},
				{
					price: 150,
					status: ["refunded"],
				},
			],
			status: ["ordered", "charged", "refunded"],
		}))
	it("removes empty item", () =>
		expect(
			model.Order.setStatus({
				...getAmountOrder(),
				event: [
					{
						type: "order",
						date: "2019-02-01T12:00:00",
					},
					{
						type: "charge",
						date: "2019-02-01T12:10:00",
						items: 500,
					},
					{
						type: "refund",
						date: "2019-02-01T12:10:00",
						items: 50,
					},
					{
						type: "refund",
						date: "2019-02-01T12:10:00",
						items: 150,
					},
				],
			})
		).toMatchObject({
			items: [
				{
					price: 300,
					status: ["charged"],
				},
				{
					price: 200,
					status: ["refunded"],
				},
			],
			status: ["charged", "refunded"],
		}))
	it("cancel cancels everything", () =>
		expect(
			model.Order.setStatus({
				...getAmountOrder(),
				event: [
					{
						type: "order",
						date: "2019-02-01T12:00:00",
					},
					{
						type: "charge",
						date: "2019-02-01T12:10:00",
						items: 500,
					},
					{
						type: "refund",
						date: "2019-02-01T12:10:00",
						items: 50,
					},
					{
						type: "cancel",
						date: "2019-02-01T12:10:00",
					},
				],
			})
		).toMatchObject({
			items: {
				price: 500,
				status: ["cancelled"],
			},
			status: ["cancelled"],
		}))
})
