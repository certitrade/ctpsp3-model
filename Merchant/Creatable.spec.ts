import * as model from "../index"

describe("model.Merchant.Creatable", () => {
	const merchant: model.Merchant.Creatable = {
		"id": "testtest",
		"name": "Test AB",
		"url": "http://example.com",
		"logotype": "https:/example.com",
		"terms": "https:/example.com",
		"email": {
			"key": "exampleKey",
			"notify": "notifyvalue"
		},
		"mash": {
			"url": "https://mash.example/api",
			"user": "test01",
			"key": "exampleKey",
			"merchant": 5
		},
		"sms": {
			"key": "exampleKey",
			"sender": "TestMerchant"
		},
		"card": {
			acquirer: {
				bin: {
					mastercard: "1234",
					visa: "1234",
				},
				key: "1234-1234-1234",
				protocol: "clearhaus",
				url: "https://gateway.test.clearhaus.com",
			},
			country: "SE",
			descriptor: "test transaction",
			emv3d: {
				protocol: "ch3d1",
				url: "http://localhost:7082/ch3d1sim",
				key: "no-key"
			},
			id: "test",
			url: "http://localhost:7082",
			mcc: "1234",
			mid: "1234",
		},
	}
	it("is Merchant.Creatable", () => {
		expect(model.Merchant.Creatable.is(merchant)).toBeTruthy()
	})
	it("testing flaw (email). Not vital test, skip if it breaks", () => {
		const flawed = { ...merchant, "email": {} }
		expect(model.Merchant.Creatable.flaw(flawed)).toEqual({
			"type": "model.Merchant.Creatable",
			"flaws": [
				{
					"property": "email",
					"type": "model.Merchant.Configuration.Email",
					"flaws": [
						{
							"property": "key",
							"type": "string",
						},
					],
				},
			],
		})
	})
	it("testing flaw (email, sms). Not vital test, skip if it breaks.", () => {
		const flawed = { ...merchant, "email": {}, sms: "string" }
		expect(model.Merchant.Creatable.flaw(flawed)).toEqual({
			"type": "model.Merchant.Creatable",
			"flaws": [
				{
					"property": "email",
					"type": "model.Merchant.Configuration.Email",
					"flaws": [
						{
							"property": "key",
							"type": "string",
						},
					],
				},
				{
					"property": "sms",
					"type": "model.Merchant.Configuration.Sms",
					"flaws": undefined,
				},
			],
		})
	})
	it("testing flaw (all configurations). Not vital test, skip if it breaks.", () => {
		const flawed = { ...merchant, "card": {}, "email": {}, "sms": "string", "mash": "string", "mixed": {} }
		expect(model.Merchant.Creatable.flaw(flawed)).toEqual({
			"type": "model.Merchant.Creatable",
			"flaws": [
				{
					"property": "card",
					"type": "model.Merchant.Configuration",
					"flaws": [
						{
							"property": "country",
							"type": "isoly.CountryCode",
						},
						{
							"property": "acquirer",
							"type": "model.Acquirer.Settings",
						},
						{
							"property": "url",
							"type": "string",
						},
					],
				},
				{
					"property": "email",
					"type": "model.Merchant.Configuration.Email",
					"flaws": [
						{
							"property": "key",
							"type": "string",
						},
					],
				},
				{
					"property": "mash",
					"type": "model.Merchant.Configuration.Mash",
					"flaws": undefined,
				},
				{
					"property": "sms",
					"type": "model.Merchant.Configuration.Sms",
					"flaws": undefined,
				},
				{
					"property": "mixed",
					"type": "model.Merchant.Configuration.Mixed.Creatable",
					"flaws": [
						{ property: "private", type: "authly.Token" },
						{ property: "public", type: "authly.Token" }
					],
				},
			],
		})
	})
})
