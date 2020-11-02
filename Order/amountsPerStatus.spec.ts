import * as model from "../index"

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
			service: "PayFunc",
			created: "2019-01-31T20:00:54",
			amount: 500,
			currency: "SEK",
			status: "created",
		},
	}
}
describe("Order", () => {
	it("amountsPerStatus", () =>
		expect(
			model.Order.amountsPerStatus({
				...getAmountOrder(),
				event: [
					{
						type: "order",
						date: "2019-02-01T12:00:00",
						items: 100,
					},
					{
						type: "charge",
						date: "2019-02-01T12:10:00",
						items: 70,
					},
					{
						type: "refund",
						date: "2019-02-01T12:10:00",
						items: 20,
					},
					{
						type: "refund",
						date: "2019-02-01T12:10:00",
						items: 10,
					},
				],
			})
		).toMatchObject({
			ordered: 30,
			charged: 40,
			refunded: 30,
		}))
	it.skip("amountsPerStatus 2 to much", () =>
		expect(
			model.Order.amountsPerStatus({
				...getAmountOrder(),
				event: [
					{
						type: "order",
						date: "2019-02-01T12:00:00",
						items: 100,
					},
					{
						type: "charge",
						date: "2019-02-01T12:10:00",
						items: 70,
					},
					{
						type: "refund",
						date: "2019-02-01T12:10:00",
						items: 20,
					},
					{
						type: "refund",
						date: "2019-02-01T12:10:00",
						items: 100,
					},
				],
			})
		).toMatchObject({
			refunded: 100,
		}))
	it.skip("amountsPerStatus 3 without item", () =>
		expect(
			model.Order.amountsPerStatus({
				...getAmountOrder(),
				event: [
					{
						type: "order",
						date: "2019-02-01T12:00:00",
						items: 100,
					},
					{
						type: "charge",
						date: "2019-02-01T12:10:00",
						items: 70,
					},
					{
						type: "refund",
						date: "2019-02-01T12:10:00",
					},
				],
			})
		).toMatchObject({
			refunded: 100,
		}))
	it.skip("amountsPerStatus 3 without item", () =>
		expect(
			model.Order.amountsPerStatus({
				...getAmountOrder(),
				event: [
					{
						type: "order",
						date: "2019-02-01T12:00:00",
						items: 100,
					},
					{
						type: "charge",
						date: "2019-02-01T12:10:00",
						items: 70,
					},
					{
						type: "refund",
						date: "2019-02-01T12:10:00",
					},
				],
			})
		).toMatchObject({
			refunded: 100,
		}))
})
