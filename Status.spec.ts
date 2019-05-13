import * as model from "./"

describe("Status", () => {
	it("is", () => expect(model.Status.is(
		{ status: "cancelled" } ||
		{ status: "charged" } ||
		{ status: "oredered" } ||
		{ status: "paid" } ||
		{ status: "refunded" },
	)).toBeTruthy())
	it("is not undefined", () => expect(model.Status.is(undefined)).toBeFalsy())
	it("is not {}", () => expect(model.Status.is({})).toBeFalsy())
	it("is", () => expect(model.Status.change("ordered", "cancel")).toBe("cancelled"))
	it("is", () => expect(model.Status.change("ordered", "charge")).toBe("charged"))
	it("is", () => expect(model.Status.change("charged", "pay")).toBe("paid"))
	it("is", () => expect(model.Status.change("charged", "refund")).toBe("refunded"))
})
