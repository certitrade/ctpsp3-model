import * as model from "./"
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
			id: "07df5b95-9e93-4a23-8175-4a5ea7896cd1",
			type: "card",
			issuer: "amex",
			service: "CardFunc",
			created: "2019-01-31T20:00:54",
			amount: 100,
			currency: "SEK",
		},
	}
}
function getOrders(count = 2): model.Order[] {
	const result: model.Order[] = []
	for (let index = 0; index < count; index++)
		result.push(getOrder())
	return result
}
describe("Order", () => {
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
	it("set status defer", () => expect(model.Order.setStatus({ ...getOrder(), event: [
			{
				type: "defer",
				date: "2019-02-01T12:00:00",
			},
		]})).toMatchObject({
			items: {
				number: "ts001-b",
				name: "Basic T-shirt, black",
				price: 119.60,
				vat: 29.90,
				quantity: 2,
				status: [ "deferred", "deferred" ],
			},
			status: [ "deferred" ],
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
	it("set status defer order charge", () => expect(model.Order.setStatus({ ...getOrder(), event: [
		{
			type: "defer",
			date: "2019-02-01T12:00:00",
		},
		{
			type: "order",
			date: "2019-02-01T12:00:00",
		},
		{
			type: "charge",
			date: "2019-02-01T12:00:00",
		},
	] })).toMatchObject({
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
})
