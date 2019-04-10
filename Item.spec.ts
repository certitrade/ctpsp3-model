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
		{ number: "ts001-w", name: "Basic T-shirt, white", price: 63.20, vat: 15.30, quantity: 1 },
]
	it("is", () => expect(model.Item.is(item)).toBeTruthy())
	it("amount number", () => expect(model.Item.amount(1337)).toBe(1337))
	it("amount Item", () => expect(model.Item.amount(item)).toBe(299))
	it("amount Item", () => expect(model.Item.amount(items)).toBe(377.50))
})
