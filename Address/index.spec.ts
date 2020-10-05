import * as model from "../index"

describe("Address", () => {
	it("is", () =>
		expect(
			model.Address.is({ street: "Merchant Street 18", zipCode: "12345", city: "Merchantilium", countryCode: "SE" })
		).toBeTruthy())
	it("is general", () =>
		expect(
			model.Address.is({
				address1: "Merchant Street 18",
				address2: "12345",
				address3: "Merchantilium",
				countryCode: "",
			})
		).toBeTruthy())
	it("is not undefined", () => expect(model.Address.is(undefined)).toBeFalsy())
	it("is not {}", () => expect(model.Address.is({})).toBeFalsy())
})
