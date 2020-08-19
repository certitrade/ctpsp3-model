import * as model from "../../index"

describe("Payment.Swish.Creatable", () => {
	const payment = {
		type: "swish",
		currency: "SEK",
	}
	it("is", async () => {
		expect(model.Payment.Swish.Creatable.is(payment)).toBe(true)
	})
	it("is", async () => {
		expect(model.Payment.Swish.Creatable.flaw(payment)).toEqual({ flaws: [], type: "model.Payment.Swish.Creatable" })
	})
})
