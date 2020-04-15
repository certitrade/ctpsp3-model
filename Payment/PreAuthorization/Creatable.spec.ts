import * as model from "../../index"
describe("Payment.PreAuthToken.Creatable", () => {
	it("Payment.PreAuthToken.Creatable.is", async () => {
		const payment =	{
			token: "abc.def.ghi",
			type: "preauthorization",
		}
		expect(model.Payment.Creatable.is(payment)).toBe(true)
	})
})
