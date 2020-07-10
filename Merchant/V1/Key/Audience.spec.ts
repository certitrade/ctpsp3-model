import * as model from "../../index"

describe("Merchant.Key.Audience", () => {
	it("is private", () => expect(model.Merchant.V1.Key.Audience.is("private")).toBeTruthy())
	it("is public", () => expect(model.Merchant.V1.Key.Audience.is("private")).toBeTruthy())
	it("is private, public", () => expect(model.Merchant.V1.Key.Audience.is(["private", "public"])).toBeTruthy())
})
