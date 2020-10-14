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
	it("set status partial charge refund", () => {
		const orderTest = model.Order.setStatus({
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
		expect(orderTest).toMatchObject({
			items: {
				number: "ts001-b",
				name: "Basic T-shirt, black",
				price: 119.6,
				vat: 29.9,
				quantity: 2,
				status: ["refunded", "charged"],
			},
			status: ["charged", "refunded"],
		})
		const orderTest2 = model.Order.setStatus({
			...orderTest,
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
	})
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
			status: ["ordered", "charged"],
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
			status: ["created", "charged"],
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
	it("cancel cancels only events prior charge", () =>
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
						items: 250,
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
			items: [
				{
					price: 200,
					status: ["charged"],
				},
				{
					price: 50,
					status: ["refunded"],
				},
				{
					price: 250,
					status: ["cancelled"],
				},
			],
			status: ["cancelled", "charged", "refunded"],
		}))
	it("Total refund refunds available amount only", () =>
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
						items: 400,
					},
					{
						type: "refund",
						date: "2019-02-01T12:10:00",
						items: 200,
					},
					{
						type: "refund",
						date: "2019-02-01T12:10:00",
					},
				],
			})
		).toMatchObject({
			items: [
				{
					price: 100,
					status: ["ordered"],
				},
				{
					price: 400,
					status: ["refunded"],
				},
			],
			status: ["ordered", "refunded"],
		}))
	const synchronizeIssue: model.Order & any = {
		items: 1000,
		currency: "SEK",
		number: "bN6ZWSknJ--X",
		payment: {
			reference: "8560bf24-d1ab-4975-891f-f07ab62b11d1",
			created: "2020-09-01T13:25:54+00:00",
			amount: 1000,
			currency: "SEK",
			type: "card",
			scheme: "visa",
			iin: "422222",
			last4: "2222",
			expires: [2, 22],
			service: "cardfunc",
			status: "created",
			card:
				"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjYXJkZnVuYyIsImlhdCI6MTU5ODk2Njc1MDY2MCwiYXVkIjoicHJvZHVjdGlvbiIsInNjaGVtZSI6InZpc2EiLCJpaW4iOiI0MjIyMjIiLCJsYXN0NCI6IjIyMjIiLCJleHBpcmVzIjpbMiwyMl0sInR5cGUiOiJzaW5nbGUgdXNlIiwiY2FyZCI6IlpETXBZZU9PIn0.nefghajHg_tSMz4xS953cwQCqyye4i7Dqz_iDNlzCVP9qJmHMcBfMS-YzpAY6T20Xiru_7H4qmZhwjOidRwMF1u_19HY-BGDra3-4QyMcKM7OBLFMPsR1cLZbnLJDSi7bj318EQ9uKy4_3qgjrglERuHOIEFl9wFfKtrqo3kJ4DSNpYROaDxuPez2AgnyKDVxKiePPllWdxAajA6CiiKzlICx-bxoqp9Xkf84ryn2eyNfS6djB9WaFtv4J6Vb1eLrDW5sBIh9qeHY17y5m8dlGhAOdzTAt0NoD3q2pknV6BbgwpiZdvjW8uapKCjKiWyWyiTgLhaRcHUODbD8Z5bOg",
		},
		created: "2020-09-01T13:25:55.353Z",
		event: [
			{
				type: "order",
				date: "2020-09-01T13:25:55.353Z",
			},
			{
				type: "charge",
				date: "2020-09-01T13:26:27.906Z",
				reference: "c580092b-d9b8-4442-aa4c-164b201932dc",
			},
			{
				type: "refund",
				items: 1.98,
				date: "2020-09-01T13:26:50.706Z",
				reference: "98d13e95-e45a-413d-9ca3-61340152bdac",
			},
			{
				type: "fail",
				items: 1000,
				date: "2020-09-01T13:27:55.879Z",
				original: "refund",
				error: {
					status: 502,
					type: "backend failure",
					backend: "unknown",
					details: {
						status: 400,
						body: {
							status: {
								code: 40000,
								message: "cannot exceed remaining amount",
							},
						},
					},
					reference: null,
				},
			},
			{
				type: "fail",
				date: "2020-09-03T11:33:48.815Z",
				original: "charge",
				error: {
					status: 502,
					type: "backend failure",
					backend: "unknown",
					details: {
						status: 400,
						body: {
							status: {
								code: 40000,
								message: "no remaining amount",
							},
						},
					},
					reference: null,
				},
			},
		],
		id: "xit8mSr5VzdJIwlQ",
	}
	it("Total refund refunds available amount only", () =>
		expect(model.Order.setStatus(synchronizeIssue)).toMatchObject({
			items: [
				{
					price: 998.02,
					status: ["charged"],
				},
				{
					price: 1.98,
					status: ["refunded"],
				},
			],
			status: ["charged", "refunded"],
		}))
	it("double defer orders", () =>
		expect(
			model.Order.setStatus({
				...getAmountOrder(),
				event: [
					{
						type: "defer",
						date: "2019-02-01T12:00:00",
					},
					{
						type: "defer",
						date: "2019-02-01T12:10:00",
					},
					{
						type: "defer",
						date: "2019-02-01T12:10:00",
					},
				],
			})
		).toMatchObject({
			items: {
				price: 500,
				status: ["deferred"],
			},
			status: ["deferred"],
		}))
})
