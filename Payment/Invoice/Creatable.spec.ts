import * as model from "../../index"

describe("Payment.Invoice.Creatable", () => {
	const invoice = {
		"type": "invoice",
		"terms": { "due": 30, "fee": 0 },
	}
	it("is", () => expect(model.Payment.Invoice.Creatable.is(invoice)).toBe(true))
	it("is", () => expect(model.Payment.Invoice.Creatable.flaw(invoice)).toEqual({ flaws: [], type: "model.Payment.Invoice.Creatable" }))
})
