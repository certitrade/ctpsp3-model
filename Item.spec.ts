import * as model from "."

describe("Item", () => {
	const item: model.Item = 	{
		number: "ts001-b",
		name: "Basic T-shirt, black",
		price: 119.60,
		vat: 29.90,
		quantity: 2,
	}
	const items: model.Item[] = [
		item,
		item,
]
	it("is item", () => expect(model.Item.is(item)).toBeTruthy())
	it("vat", () => expect(model.Item.vat(item)).toBe(29.90))
	it("vat total", () => expect(model.Item.vat(items)).toEqual(59.80))
	it("amount number", () => expect(model.Item.amount(1337)).toBe(1337))
	it("amount item", () => expect(model.Item.amount(item)).toBe(299))
	it("amount items", () => expect(model.Item.amount(items)).toBe(598))
	it("as array", () => expect(model.Item.asArray(items)).toEqual(
		[
			{
				number: "ts001-b",
				name: "Basic T-shirt, black",
				price: 119.60,
				vat: 29.90,
				quantity: 2,
			},
			{
				number: "ts001-b",
				name: "Basic T-shirt, black",
				price: 119.60,
				vat: 29.90,
				quantity: 2,
			},
		],
	))
})
