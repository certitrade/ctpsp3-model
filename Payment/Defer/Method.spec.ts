import * as model from "../../index"

describe("Payment.Defer", () => {
	it("is", () => expect(model.Payment.Defer.Method.is("email")).toBeTruthy())
	it("is", () => expect(model.Payment.Defer.Method.is("sms")).toBeTruthy())
	it("is", () => expect(model.Payment.Defer.Method.is("link")).toBeTruthy())
	it("is not", () => expect(model.Payment.Defer.Method.is("abcd")).toBeFalsy())
})
