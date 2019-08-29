import * as model from "../index"

describe("Merchant.Key", () => {
	const key = {
		iss: "http://localhost:7082",
		iat: 1565200888358,
		aud: "private",
		sub: "par9",
		name: "test",
		option: {},
	}
	it("is", () => expect(model.Merchant.Key.is(key)).toBeTruthy())
	it("Merchant.Creatable.is", () => expect(model.Merchant.Creatable.is(key)).toBeTruthy())
	it("flaw", () => {
		const k = key
		delete k.sub
		expect(model.Merchant.Key.flaw(key)).toEqual({
			flaws: [
				{
					condition: "Merchant identifier.",
					property: "sub",
					type: "authly.Identifier",
				},
			],
			type: "model.Merchant.Key",
		})
	})
})
