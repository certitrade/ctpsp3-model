import * as gracely from "gracely"
import * as model from "../../index"

describe("PaymentVerifier.Response", () => {
	it("PaymentVerifier.VerificationRequired", async () => {
		const test: model.PaymentVerifier.Response.VerificationRequired = model.PaymentVerifier.Response.verificationRequired(
			true,
			"GET",
			"http://localhost:7082/ch3d1sim/acs",
			{
				pareq: "examplepareq",
			}
		)
		const output = test.toError("card.payment", "Card.Token")
		const error = gracely.client.malformedContent("card.payment", "Card.Token", "verification required", {
			visible: true,
			method: "GET",
			url: "http://localhost:7082/ch3d1sim/acs",
			data: {
				pareq: "examplepareq",
			},
		})
		expect(output).toEqual(error)
	})
})
