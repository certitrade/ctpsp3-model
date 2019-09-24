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
			id: "07df5b95-9e93-4a23-8175-4a5ea7896cd1",
			type: "card",
			scheme: "amex",
			iin: "41111111",
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
function getOrders(count = 2): model.Order[] {
	const result: model.Order[] = []
	for (let index = 0; index < count; index++)
		result.push(getOrder())
	return result
}
describe("Order", () => {
	it("is", () => expect(model.Order.is(getOrder())).toBeTruthy())
	it("getCreatablePayment", () => {
		expect(model.Order.getCreatablePayment({
			currency: "SEK",
			items: [
				{
					name: "Basic T-shirt, black",
					number: "ts001-b",
					price: 419.6,
					quantity: 2,
					vat: 29.9,
				},
			],
			number: "5KZD-k",
			payment: {
				reference: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjYXJkIiwiaWF0IjoxNTY5MzE1MTk1MDkxLCJpZCI6IkxSUXkwR1duajZ2byIsIm51bWJlciI6IjVLWkQtayIsInJlZmVyZW5jZSI6ImY5ZTc4ODA3LTcxNzctNDZkNS04NmJiLTkwMTM4MDE1MTNkNyIsImNyZWF0ZWQiOiIyMDE5LTA5LTI0VDA4OjUzOjE0KzAwOjAwIiwiYW1vdW50Ijo4OTksImN1cnJlbmN5IjoiU0VLIiwiY2FyZCI6eyJpZCI6IndfRHZsQWQyIiwic2NoZW1lIjoidmlzYSIsImlpbiI6IjQxMDAwMDAwIiwibGFzdDQiOiIwMDAwIiwiZXhwaXJlcyI6WzIsMjBdfSwiY2FwdHVyZSI6W10sInJlZnVuZCI6W119.MTmSc8eMo49wFeLoHli7kfdVpaWDt7vLcoirYFRUWHrf3KkuyK-_ZtHsLdRqiSUS_jrMhm0q-v-VxOcvK25XiwQFb5OvDtsjkIMXD4FKroNl4ajJ8xJvn_yFq7xWQeXUKuEFkIAeV11gKxR6zhFci9AFSYYl_G4BsShVe134UgT8uCUbGXxfh54tcEgT3DgKzJ_A09RmXp2-6ZPe6y8kr-MqQMoCd8Ew86reSjf4m3hJtpKeAyKEXf_-gZ0VaWDbrFvDXzy22BJ8SeSS7l44AcLL1Zq7ohwWYx1EeyURmQuqeOfQ6gofYK5MipDa_opgxgXSuEIvB4XdyZEu2GrvKg",
				type: "card",
			},
		})).toEqual(
			{
				amount: undefined,
				currency: "SEK",
				number: "5KZD-k",
				reference: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjYXJkIiwiaWF0IjoxNTY5MzE1MTk1MDkxLCJpZCI6IkxSUXkwR1duajZ2byIsIm51bWJlciI6IjVLWkQtayIsInJlZmVyZW5jZSI6ImY5ZTc4ODA3LTcxNzctNDZkNS04NmJiLTkwMTM4MDE1MTNkNyIsImNyZWF0ZWQiOiIyMDE5LTA5LTI0VDA4OjUzOjE0KzAwOjAwIiwiYW1vdW50Ijo4OTksImN1cnJlbmN5IjoiU0VLIiwiY2FyZCI6eyJpZCI6IndfRHZsQWQyIiwic2NoZW1lIjoidmlzYSIsImlpbiI6IjQxMDAwMDAwIiwibGFzdDQiOiIwMDAwIiwiZXhwaXJlcyI6WzIsMjBdfSwiY2FwdHVyZSI6W10sInJlZnVuZCI6W119.MTmSc8eMo49wFeLoHli7kfdVpaWDt7vLcoirYFRUWHrf3KkuyK-_ZtHsLdRqiSUS_jrMhm0q-v-VxOcvK25XiwQFb5OvDtsjkIMXD4FKroNl4ajJ8xJvn_yFq7xWQeXUKuEFkIAeV11gKxR6zhFci9AFSYYl_G4BsShVe134UgT8uCUbGXxfh54tcEgT3DgKzJ_A09RmXp2-6ZPe6y8kr-MqQMoCd8Ew86reSjf4m3hJtpKeAyKEXf_-gZ0VaWDbrFvDXzy22BJ8SeSS7l44AcLL1Zq7ohwWYx1EeyURmQuqeOfQ6gofYK5MipDa_opgxgXSuEIvB4XdyZEu2GrvKg",
				type: "card",
			},
		)
	})
	it("isCreatable", () => expect(model.Order.isCreatable({ items: 1337.42, currency: "SEK", payment: "aaaaaa.bbbbbbbb.cccccc"})).toBeTruthy())
	it ("isCreatable 2", () => expect(model.Order.isCreatable(
		{
			currency: "SEK",
			items: [
				{
					name: "Basic T-shirt, black",
					number: "ts001-b",
					price: 419.6,
					quantity: 2,
					vat: 29.9,
				},
			],
			number: "5KZD-k",
			payment: {
				amount: 899,
				currency: "SEK",
				reference: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjYXJkIiwiaWF0IjoxNTY5MzE1MTk1MDkxLCJpZCI6IkxSUXkwR1duajZ2byIsIm51bWJlciI6IjVLWkQtayIsInJlZmVyZW5jZSI6ImY5ZTc4ODA3LTcxNzctNDZkNS04NmJiLTkwMTM4MDE1MTNkNyIsImNyZWF0ZWQiOiIyMDE5LTA5LTI0VDA4OjUzOjE0KzAwOjAwIiwiYW1vdW50Ijo4OTksImN1cnJlbmN5IjoiU0VLIiwiY2FyZCI6eyJpZCI6IndfRHZsQWQyIiwic2NoZW1lIjoidmlzYSIsImlpbiI6IjQxMDAwMDAwIiwibGFzdDQiOiIwMDAwIiwiZXhwaXJlcyI6WzIsMjBdfSwiY2FwdHVyZSI6W10sInJlZnVuZCI6W119.MTmSc8eMo49wFeLoHli7kfdVpaWDt7vLcoirYFRUWHrf3KkuyK-_ZtHsLdRqiSUS_jrMhm0q-v-VxOcvK25XiwQFb5OvDtsjkIMXD4FKroNl4ajJ8xJvn_yFq7xWQeXUKuEFkIAeV11gKxR6zhFci9AFSYYl_G4BsShVe134UgT8uCUbGXxfh54tcEgT3DgKzJ_A09RmXp2-6ZPe6y8kr-MqQMoCd8Ew86reSjf4m3hJtpKeAyKEXf_-gZ0VaWDbrFvDXzy22BJ8SeSS7l44AcLL1Zq7ohwWYx1EeyURmQuqeOfQ6gofYK5MipDa_opgxgXSuEIvB4XdyZEu2GrvKg",
				type: "card",
			},
		})).toBeTruthy())
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
