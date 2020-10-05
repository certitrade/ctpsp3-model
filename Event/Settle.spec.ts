import * as model from "../index"

describe("Event.Settle tests", () => {
	it("example", () => {
		expect(
			model.Event.Settle.is({
				type: "settle",
				amount: 500,
				currency: "SEK",
				period: {
					start: "2020-09-23T00:00:00.000Z",
					end: "2020-09-30T23:59:59.999Z",
				},
				fee: {
					total: 110,
					sales: 10,
					refunds: 10,
					authorisations: 10,
					credits: 10,
					interchange: 10,
					scheme: 10,
					minimumProcessing: 10,
					service: 10,
					wireTransfer: 10,
					chargebacks: 10,
					retrievalRequests: 10,
				},
				payout: {
					amount: 390,
					date: "2020-10-01T11:39:38.291Z",
					descriptor: "example",
					reference: "example",
				},
				date: "2020-10-02T10:25:00.000Z",
			})
		).toBeTruthy()
	})
	it("create", () => {
		const settlement: model.Event.Creatable & any = {
			type: "settle",
			amount: 500,
			currency: "SEK",
			period: {
				start: "2020-09-23T00:00:00.000Z",
				end: "2020-09-30T23:59:59.999Z",
			},
			fee: {
				total: 110,
				sales: 10,
				refunds: 10,
				authorisations: 10,
				credits: 10,
				interchange: 10,
				scheme: 10,
				minimumProcessing: 10,
				service: 10,
				wireTransfer: 10,
				chargebacks: 10,
				retrievalRequests: 10,
			},
			payout: {
				amount: 390,
				date: "2020-10-01T11:39:38.291Z",
				descriptor: "example",
				reference: "example",
			},
		}
		expect(model.Event.Settle.is(model.Event.create(settlement, "2020-10-02T10:25:00.000Z"))).toBeTruthy()
	})
})
