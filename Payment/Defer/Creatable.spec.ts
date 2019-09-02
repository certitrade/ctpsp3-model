import * as model from "../../index"

describe("Payment.Defer.Creatable", () => {
	it("is", () => expect(model.Payment.Defer.Creatable.is({
		type: "defer",
		method: "sms",
		contact: "0712-34 56 789",
		number: "order12359",
		client: "42233c8o",
		items: 1337.42,
		currency: "SEK",
	})).toBeTruthy())
})
