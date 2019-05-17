import * as model from "./"

describe("Status", () => {
	const status = [
		"ordered",
		"cancelled",
		"charged",
		"paid",
		"refunded",
	]
	it("is", () => expect(model.Status.is(status)).toBeTruthy())
	it("change to ordered", () => expect(model.Status.change(undefined, "order")).toBe("ordered"))
	it("change to charged", () => expect(model.Status.change("ordered", "charge")).toBe("charged"))
	it("change to cancelled", () => expect(model.Status.change("ordered", "cancel")).toBe("cancelled"))
	it("change to paid", () => expect(model.Status.change("charged", "pay")).toBe("paid"))
	it("change to refunded", () => expect(model.Status.change("charged", "refund")).toBe("refunded"))
})
