import * as model from "../../index"
describe("Payment.Account.Creatable", () => {
	it("Payment.Account.Creatable.is account", async () => {
		const payment =	{
			account: "abc.def.ghi",
			type: "account",
		}
		expect(model.Payment.Creatable.is(payment)).toBe(true)
	})
})
