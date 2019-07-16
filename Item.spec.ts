import * as model from "."

describe("Item", () => {
	const item: model.Item = {
		number: "ts001-b",
		name: "Basic T-shirt, black",
		price: 119.60,
		vat: 29.90,
		quantity: 2,
	}
	it("is item", () => expect(model.Item.is(item)).toBeTruthy())
	it("is item w/o number", () => expect(model.Item.is({
		name: "Basic T-shirt, black",
		price: 119.60,
		vat: 29.90,
		quantity: 2,
	})).toBeTruthy())
	it("items", () => expect(model.Item.canBe([item, item])).toBeTruthy())
	it("canBe number", () => expect(model.Item.canBe(1337.42)).toBeTruthy())
	it("canBe item", () => expect(model.Item.canBe(item)).toBeTruthy())
	it("canBe item[]", () => expect(model.Item.canBe([item, item])).toBeTruthy())
	it("vat", () => expect(model.Item.vat(item)).toBe(29.90))
	it("vat total", () => expect(model.Item.vat([item, item])).toEqual(59.80))
	it("amount number", () => expect(model.Item.amount(1337)).toBe(1337))
	it("amount item", () => expect(model.Item.amount(item)).toBe(299))
	it("amount items", () => expect(model.Item.amount([item, item])).toBe(598))
	it("as array", () => expect(model.Item.asArray([item, item])).toEqual(
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
	it("applyEvent", () => {
		const items = [ { ...item } ]
		model.Item.applyEvent(items, { type: "order", date: "2019-10-10T00:00:00" })
		expect(items).toEqual([
			{
				"name": "Basic T-shirt, black",
				"number": "ts001-b",
				"price": 119.6,
				"quantity": 2,
				"status": [
					"ordered",
					"ordered",
				],
				"vat": 29.9,
			},
		])
	})
	it("applyItem order 3", () => {
		const items = [ { ...item }, { ...item } ]
		model.Item.applyItem(items, "order", 3, item)
		expect(items).toMatchObject([{ status: [ "ordered", "ordered" ] }, { status: [ "ordered", undefined ] }])
	})
	it("applyItem order 1", () => {
		const items = [ { ...item }, { ...item } ]
		model.Item.applyItem(items, "order", 1, item)
		expect(items).toMatchObject([{ status: [ "ordered", undefined ] }, { status: [ undefined, undefined ] }])
	})
	it("applyItem defer 3", () => {
		const items = [ { ...item }, { ...item } ]
		model.Item.applyItem(items, "defer", 3, item)
		expect(items).toMatchObject([{ status: [ "deferred", "deferred" ] }, { status: [ "deferred", undefined ] }])
	})
})
