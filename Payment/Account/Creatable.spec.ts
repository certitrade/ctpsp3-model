import * as model from "../../index"
describe("Payment.Account.Creatable", () => {
	it("Payment.Account.Creatable.is account", async () => {
		const payment =	{
			account: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJDYXJkRnVuYyIsImlhdCI6MTU4MTYwMTg4MTEzMywiYXVkIjoicHJvZHVjdGlvbiIsImlkIjoiT2FELWs1WDYifQ.jGvz-gUpDewvwUbZCMXQmpPqt1Jm2bVAS6YIRM9Rq8ZNGo1gZtPjbvogXVUhDbdW5mV3qmi-cj8aENFeYj9lVttqnymt_bQ8K_BpLwYEJlWcapds9oRGEvZZeWSRjPoKgjz5Uj5S44ZPuQhUcpGknOh0x4YoKKAbXzTYSqVmbt89BDS3H1B79c1IuUgAzAIE2cmb4Ti2dDmyYn9bud6TXYL_PqAYapO-VNgrXw0-iBRpD94mb47Oh5J34etCfeIwX33-eRkOwtfiFUuyUP6iBC89HdV_apf8pj-Qvkr2zScGJAF2AAMKnLNot_fS70B5gbmOW6ZitTqsdbwzcUjONw",
			type: "account",
		}
		expect(model.Payment.Creatable.is(payment)).toBe(true)
	})
})
