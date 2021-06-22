import * as model from "../../index"
describe("Payment.Customer.Creatable", () => {
	it("Payment.Customer.Creatable.is customer", async () => {
		const payment = {
			token: "abc.def.ghi",
			type: "customer",
		}
		expect(model.Payment.Creatable.is(payment)).toBe(true)
	})
})
