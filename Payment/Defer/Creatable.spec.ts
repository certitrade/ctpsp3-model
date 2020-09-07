import * as model from "../../index"

describe("Payment.Defer.Creatable", () => {
	it("is defer/email (with contact)", () =>
		expect(
			model.Payment.Defer.Creatable.is({
				type: "defer",
				method: "email",
				contact: "example@payfunc.com",
				number: "order12359",
				client: "42233c8o",
				items: 1337.42,
				currency: "SEK",
			})
		).toBeTruthy())
	it("is not defer/email (without contact)", () =>
		expect(
			model.Payment.Defer.Creatable.is({
				type: "defer",
				method: "email",
				number: "order12359",
				client: "42233c8o",
				items: 1337.42,
				currency: "SEK",
			})
		).toBeFalsy())
	it("is defer/sms (with contact)", () =>
		expect(
			model.Payment.Defer.Creatable.is({
				type: "defer",
				method: "sms",
				contact: "0712-34 56 789",
				number: "order12359",
				client: "42233c8o",
				items: 1337.42,
				currency: "SEK",
			})
		).toBeTruthy())
	it("is not defer/sms (without contact)", () =>
		expect(
			model.Payment.Defer.Creatable.is({
				type: "defer",
				method: "sms",
				number: "order12359",
				client: "42233c8o",
				items: 1337.42,
				currency: "SEK",
			})
		).toBeFalsy())
	it("is defer/link (with contact)", () =>
		expect(
			model.Payment.Defer.Creatable.is({
				type: "defer",
				method: "link",
				contact: "0712-34 56 789",
				number: "order12359",
				client: "42233c8o",
				items: 1337.42,
				currency: "SEK",
			})
		).toBeTruthy())
	it("is defer/link (without contact)", () =>
		expect(
			model.Payment.Defer.Creatable.is({
				type: "defer",
				method: "link",
				number: "order12359",
				client: "42233c8o",
				items: 1337.42,
				currency: "SEK",
			})
		).toBeTruthy())
})
