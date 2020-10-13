import * as model from "../index"

describe("Event.Settle tests", () => {
	it("example", () => {
		expect(
			model.Event.Settle.is({
				type: "settle",
				period: {
					start: "2020-09-23T00:00:00.000Z",
					end: "2020-09-30T23:59:59.999Z",
				},
				payout: "2020-10-01T11:39:38.291Z",
				amount: {
					gross: 25,
					net: 24.25,
				},
				fee: -0.75,
				currency: "SEK",
				descriptor: "example",
				reference: "example",
				date: "2020-10-02T10:25:00.000Z",
			})
		).toBeTruthy()
	})
	it("create", () => {
		const settlement: model.Event.Creatable & any = {
			type: "settle",
			period: {
				start: "2020-09-23T00:00:00.000Z",
				end: "2020-09-30T23:59:59.999Z",
			},
			payout: "2020-10-01T11:39:38.291Z",
			amount: {
				gross: -25,
				net: -27.25,
			},
			fee: -2.25,
			currency: "SEK",
			descriptor: "example",
			reference: "example",
		}
		expect(model.Event.Settle.is(model.Event.create(settlement, "2020-10-02T10:25:00.000Z"))).toBeTruthy()
	})
})
