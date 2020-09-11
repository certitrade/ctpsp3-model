import * as model from "../../index"

describe("VerificationError", () => {
	it("IsVerificationError no data", () => {
		const verifier = model.PaymentVerifier.Response.verificationRequired(
			true,
			"POST",
			"https://example.com/verify?target=https%3A%2F%2Fexample.com%2Fcallback"
		)
		const cardTokenError = verifier.toError("payment.card", "Card.Token")
		expect(model.PaymentVerifier.Response.VerificationRequired.isVerificationError(cardTokenError)).toBeTruthy()
		expect(
			model.PaymentVerifier.Response.VerificationRequired.isCardTokenVerificationError(cardTokenError)
		).toBeTruthy()
		const error = verifier.toError("payment.other", "Other.Token")
		expect(model.PaymentVerifier.Response.VerificationRequired.isVerificationError(error)).toBeTruthy()
		expect(model.PaymentVerifier.Response.VerificationRequired.isCardTokenVerificationError(error)).toBeFalsy()
	})
	it("IsVerificationError with data", () => {
		const verifier = model.PaymentVerifier.Response.verificationRequired(
			true,
			"POST",
			"https://example.com/verify?target=https%3A%2F%2Fexample.com%2Fcallback",
			{
				hi: "hello",
				remove: "soon",
			}
		)
		const cardTokenError = verifier.toError("payment.card", "Card.Token")
		expect(model.PaymentVerifier.Response.VerificationRequired.isVerificationError(cardTokenError)).toBeTruthy()
		expect(
			model.PaymentVerifier.Response.VerificationRequired.isCardTokenVerificationError(cardTokenError)
		).toBeTruthy()
		if (model.PaymentVerifier.Response.VerificationRequired.isVerificationError(cardTokenError)) {
			if (cardTokenError.content.details.data?.remove)
				delete cardTokenError.content.details.data?.remove
			expect(model.PaymentVerifier.Response.VerificationRequired.isVerificationError(cardTokenError)).toBeTruthy()
			expect(
				model.PaymentVerifier.Response.VerificationRequired.isCardTokenVerificationError(cardTokenError)
			).toBeTruthy()
		}
		const error = verifier.toError("payment.other", "Other.Token")
		expect(model.PaymentVerifier.Response.VerificationRequired.isVerificationError(error)).toBeTruthy()
		expect(model.PaymentVerifier.Response.VerificationRequired.isCardTokenVerificationError(error)).toBeFalsy()
	})
})
