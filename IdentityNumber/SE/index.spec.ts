import * as model from "../.."

describe("IdentityNumber.SE", () => {
	it("calculateChecksum", () => {
		expect(model.IdentityNumber.SE.calculateChecksum("1234567897")).toBe(7)
	})
	it("is", () => {
		expect(model.IdentityNumber.SE.is("1234567897"))
	})
})
