import * as model from "./index"

describe("Settlement", () => {
	const orderArray: model.Order[] = [
		{
			id: "01234567abcd0000",
			created: "2019-01-31T20:01:34",
			items: [
				{
					number: "ts001-b",
					name: "Basic T-shirt, black",
					price: 119.6,
					vat: 29.9,
					quantity: 2,
				},
			],
			currency: "SEK",
			payment: {
				type: "card",
				scheme: "amex",
				iin: "411111",
				last4: "1111",
				expires: [1, 20],
				service: "PayFunc",
				created: "2019-01-31T20:00:54",
				amount: 100,
				currency: "SEK",
				status: "created",
			},
			event: [
				{
					type: "settle",
					period: {
						start: "2020-02-01T00:00:00.000Z",
						end: "2020-02-07T23:59:59.999Z",
					},
					payout: "2020-02-09T11:39:38.291Z",
					gross: 249,
					net: 241.5,
					fee: -7.5,
					currency: "SEK",
					descriptor: "example",
					reference: "example1",
					date: "2020-02-08T10:25:00.000Z",
				},
				{
					type: "settle",
					period: {
						start: "2020-02-08T00:00:00.000Z",
						end: "2020-02-15T23:59:59.999Z",
					},
					payout: "2020-02-18T11:39:38.291Z",
					gross: -124.5,
					net: -128.25,
					fee: -3.75,
					currency: "SEK",
					descriptor: "example",
					reference: "example2",
					date: "2020-02-16T10:25:00.000Z",
				},
			],
			status: {
				charged: 124.5,
				refunded: 124.5,
				settled: -11.25,
			},
		},
		{
			id: "01234567abcd0001",
			created: "2019-01-31T20:01:34",
			items: [
				{
					number: "ts001-b",
					name: "Basic T-shirt, black",
					price: 119.6,
					vat: 29.9,
					quantity: 2,
				},
			],
			currency: "SEK",
			payment: {
				type: "card",
				scheme: "amex",
				iin: "411111",
				last4: "1111",
				expires: [1, 20],
				service: "PayFunc",
				created: "2019-01-31T20:00:54",
				amount: 100,
				currency: "SEK",
				status: "created",
			},
			event: [
				{
					type: "settle",
					period: {
						start: "2020-02-01T00:00:00.000Z",
						end: "2020-02-07T23:59:59.999Z",
					},
					payout: "2020-02-09T11:39:38.291Z",
					gross: 249,
					net: 241.5,
					fee: -7.5,
					currency: "SEK",
					descriptor: "example",
					reference: "example1",
					date: "2020-02-08T10:25:00.000Z",
				},
				{
					type: "settle",
					period: {
						start: "2020-02-08T00:00:00.000Z",
						end: "2020-02-15T23:59:59.999Z",
					},
					payout: "2020-02-18T11:39:38.291Z",
					gross: -124.5,
					net: -128.25,
					fee: -3.75,
					currency: "SEK",
					descriptor: "example",
					reference: "example2",
					date: "2020-02-16T10:25:00.000Z",
				},
			],
			status: {
				charged: 124.5,
				refunded: 124.5,
				settled: -11.25,
			},
		},
	]
	it("generate", () => {
		const settlement = model.Settlement.generate(orderArray)
		expect(settlement.every(model.Settlement.is)).toEqual(true)
	})
	it("toCsv 1 settlement with orders", () => {
		const csvOutput = model.Settlement.toCsv(model.Settlement.generate(orderArray)[0])
		expect(csvOutput).toEqual(
			"reference,start date,end date,payout date,gross,fee,net,currency\r\n" +
				'"example1","2020-02-01","2020-02-07","2020-02-09","498","-15","483","SEK"\r\n' +
				"number,created,gross,fee,net,status\r\n" +
				'"01234567abcd0000","2019-01-31","249","-7.5","241.5","charged refunded settled"\r\n' +
				'"01234567abcd0001","2019-01-31","249","-7.5","241.5","charged refunded settled"\r\n'
		)
	})
	it("toCsv several settlements without orders", () => {
		const csvOutput = model.Settlement.toCsv(model.Settlement.generate(orderArray))
		expect(csvOutput).toEqual(
			"reference,start date,end date,payout date,gross,fee,net,currency\r\n" +
				'"example1","2020-02-01","2020-02-07","2020-02-09","498","-15","483","SEK"\r\n' +
				'"example2","2020-02-08","2020-02-15","2020-02-18","-249","-7.5","-256.5","SEK"\r\n'
		)
	})
	it("toCsv several settlements with orders", () => {
		const csvOutput = model.Settlement.toCsv(model.Settlement.generate(orderArray), true)
		expect(csvOutput).toEqual(
			"reference,start date,end date,payout date,gross,fee,net,currency\r\n" +
				'"example1","2020-02-01","2020-02-07","2020-02-09","498","-15","483","SEK"\r\n' +
				"number,created,gross,fee,net,status\r\n" +
				'"01234567abcd0000","2019-01-31","249","-7.5","241.5","charged refunded settled"\r\n' +
				'"01234567abcd0001","2019-01-31","249","-7.5","241.5","charged refunded settled"\r\n' +
				'"example2","2020-02-08","2020-02-15","2020-02-18","-249","-7.5","-256.5","SEK"\r\n' +
				"number,created,gross,fee,net,status\r\n" +
				'"01234567abcd0000","2019-01-31","-124.5","-3.75","-128.25","charged refunded settled"\r\n' +
				'"01234567abcd0001","2019-01-31","-124.5","-3.75","-128.25","charged refunded settled"\r\n'
		)
	})
})
