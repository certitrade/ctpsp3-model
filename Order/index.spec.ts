import * as model from "../index"
function getOrder(): model.Order {
	return {
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
				number: "ts001-b",
				name: "Basic T-shirt, black",
				price: 119.60,
				vat: 29.90,
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
function getOrders(): model.Order[] {
	return [
		{
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
					number: "ts001-b",
					name: "Basic T-shirt, black",
					price: 119.60,
					vat: 29.90,
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
			id: "6cdacdb69126ef507c9251b4",
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
					price: 119.60,
					vat: 29.90,
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
]}
describe("Order", () => {
	it("toCsv", () => expect(model.Order.toCsv(getOrder())).toEqual(`id,number,created,client,customer type,customer identity number,customer id,customer number,item count, item amount,currency,payment type,payment service,payment created,payment amount,payment currency,status\r\n"5cdacdb69126ef507c9251b3","1","2019-01-31T20:01:34","42233c81-caf1-44f7-821e-7a28c6198ebc","person","195505103613","999999999",,1,299,"SEK","card","CardFunc","2019-01-31T20:00:54",100,"SEK",\r\n`))
	it("array toCsv", () => expect(model.Order.toCsv(getOrders())).toEqual(`id,number,created,client,customer type,customer identity number,customer id,customer number,item count, item amount,currency,payment type,payment service,payment created,payment amount,payment currency,status\r\n"5cdacdb69126ef507c9251b3","1","2019-01-31T20:01:34","42233c81-caf1-44f7-821e-7a28c6198ebc","person","195505103613","999999999",,1,299,"SEK","card","CardFunc","2019-01-31T20:00:54",100,"SEK",\r\n"6cdacdb69126ef507c9251b4","2","2019-01-31T21:02:35","42233c81-caf1-44f7-821e-7a28c6198ebc","person","195505103613","999999999",,1,299,"SEK","card","CardFunc","2019-01-31T21:01:55",200,"SEK",\r\n`))
	it("is", () => expect(model.Order.is(getOrder())).toBeTruthy())
	it("set status order", () => expect(model.Order.setStatus({ ...getOrder(), event: [
			{
				type: "order",
				date: "2019-02-01T12:00:00",
			},
		] })).toMatchObject({
			items: {
				number: "ts001-b",
				name: "Basic T-shirt, black",
				price: 119.60,
				vat: 29.90,
				quantity: 2,
				status: [ "ordered", "ordered" ],
			},
			status: [ "ordered" ],
		}),
	)
	it("set status order charge", () => expect(model.Order.setStatus({ ...getOrder(), event: [
			{
				type: "order",
				date: "2019-02-01T12:00:00",
			},
			{
				type: "charge",
				date: "2019-02-01T12:00:00",
			},
		]})).toMatchObject({
			items: {
				number: "ts001-b",
				name: "Basic T-shirt, black",
				price: 119.60,
				vat: 29.90,
				quantity: 2,
				status: [ "charged", "charged" ],
			},
			status: [ "charged" ],
		}),
	)
	it("set status order charge refund", () => expect(model.Order.setStatus({ ...getOrder(), event: [
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
	] })).toMatchObject({
		items: {
			number: "ts001-b",
			name: "Basic T-shirt, black",
			price: 119.60,
			vat: 29.90,
			quantity: 2,
			status: [ "refunded", "refunded" ],
		},
		status: [ "refunded" ],
	}),
)
})
