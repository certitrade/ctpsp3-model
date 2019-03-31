import * as model from "../"

describe("Address", () => {
	it("is", () => expect(model.Address.is({ street: "Merchant Street 18", zipCode: "12345", city: "Merchantilium", countryCode: "SE" })).toBeTruthy())
	it("is not undefined", () => expect(model.Address.is(undefined)).toBeFalsy())
	it("is not {}", () => expect(model.Address.is({})).toBeFalsy())
})
