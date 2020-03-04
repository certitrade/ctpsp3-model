import * as gracely from "gracely"
import * as model from "../"

describe("Account.Creatable", () => {
	it("Account.Creatable.is not valid account", async () => {
		const account =	{
			"number": "ijklmnop",
			"customer": {
				"type": "person"
			},
			"method": [
				{
					"type": "card",
					"scheme": "visa",
					"iin": "41111",
					"last4": "0000",
					"expires": [
						2,
						225
					],
					"reference": "abc.def.ghi"
				},
				{
					"type": "ca",
					"scheme": "via",
					"iin": "411111",
					"last4": "000",
					"expires": [
						2,
						22
					],
					"reference": "abc.def.ghi",
					"created": "23"
				}
			]
		}
		expect(gracely.client.flawedContent(model.Account.Creatable.flaw(account)).response.body).toEqual({
			"status": 400,
			"type": "flawed content",
			"content": {
				"type": "model.Account",
				"flaws": [
					{
						"type": "model.Account.Base",
						"flaws": [
							{
								"property": "iin",
								"type": "string"
							},
							{
								"property": "expires",
								"type": "Payment.Card.Expires"
							}
						]
					},
					{
						"type": "model.Account.Base",
						"flaws": [
							{
								"property": "scheme",
								"type": "Payment.Card.Scheme"
							},
							{
								"property": "last4",
								"type": "string"
							},
							{
								"type": "model.Account.Base",
								"flaws": [
									{
										"property": "type",
										"type": "Account.Method.Type"
									},
									{
										"property": "created",
										"type": "isoly.DateTime"
									}
								]
							}
						]
					}
				]
			}
		})
	})

	it("Account.Creatable.is not valid account, everything wrong", async () => {
		const account =	{
			"number": "",
			"customer": {
				"type": "none"
			},
			"method": [
				{
					"type": "letter",
					"scheme": "ship",
					"iin": "out",
					"last4": "fiver",
					"expires": [
						"feb",
						"2025"
					],
					"reference": "notaauthlytoken"
				},
				{
					"type": "telegram",
					"scheme": "horse",
					"iin": "iin",
					"last4": "14",
					"expires": [
						99
					],
					"reference": 12,
					"created": "23 feb 2077"
				}
			]
		}
		expect(gracely.client.flawedContent(model.Account.Creatable.flaw(account)).response.body).toEqual({
			"status": 400,
			"type": "flawed content",
			"content": {
				"type": "model.Account",
				"flaws": [
					{
						"property": "customer",
						"type": "Customer"
					},
					{
						"type": "model.Account.Base",
						"flaws": [
							{
								"property": "reference",
								"type": "authly.Token"
							},
							{
								"property": "scheme",
								"type": "Payment.Card.Scheme"
							},
							{
								"property": "iin",
								"type": "string"
							},
							{
								"property": "last4",
								"type": "string"
							},
							{
								"property": "expires",
								"type": "Payment.Card.Expires"
							},
							{
								"type": "model.Account.Base",
								"flaws": [
									{
										"property": "type",
										"type": "Account.Method.Type"
									}
								]
							}
						]
					},
					{
						"type": "model.Account.Base",
						"flaws": [
							{
								"property": "reference",
								"type": "authly.Token"
							},
							{
								"property": "scheme",
								"type": "Payment.Card.Scheme"
							},
							{
								"property": "iin",
								"type": "string"
							},
							{
								"property": "last4",
								"type": "string"
							},
							{
								"property": "expires",
								"type": "Payment.Card.Expires"
							},
							{
								"type": "model.Account.Base",
								"flaws": [
									{
										"property": "type",
										"type": "Account.Method.Type"
									},
									{
										"property": "created",
										"type": "isoly.DateTime"
									}
								]
							}
						]
					}
				]
			}
		})
	})
	it("missing method", async () => {
		const value: any = { someProperty: "" }
		expect(model.Account.Creatable.flaw(value)).toEqual({"flaws": [{ property: "method", type: "array" }], "type": "model.Account"})
	})
	it("real flaw test", async () => {
		const value: any = { someProperty: "abcf", method: "abc" }
		expect(model.Account.Creatable.flaw(value)).toEqual({"flaws": [{ property: "method", type: "array" }], "type": "model.Account"})
	})
})
