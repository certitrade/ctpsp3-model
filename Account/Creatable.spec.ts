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
					"reference": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJDYXJkRnVuYyIsImlhdCI6MTU4MTYwMTg4MTEzMywiYXVkIjoicHJvZHVjdGlvbiIsImlkIjoiT2FELWs1WDYifQ.jGvz-gUpDewvwUbZCMXQmpPqt1Jm2bVAS6YIRM9Rq8ZNGo1gZtPjbvogXVUhDbdW5mV3qmi-cj8aENFeYj9lVttqnymt_bQ8K_BpLwYEJlWcapds9oRGEvZZeWSRjPoKgjz5Uj5S44ZPuQhUcpGknOh0x4YoKKAbXzTYSqVmbt89BDS3H1B79c1IuUgAzAIE2cmb4Ti2dDmyYn9bud6TXYL_PqAYapO-VNgrXw0-iBRpD94mb47Oh5J34etCfeIwX33-eRkOwtfiFUuyUP6iBC89HdV_apf8pj-Qvkr2zScGJAF2AAMKnLNot_fS70B5gbmOW6ZitTqsdbwzcUjONw"
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
					"reference": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJDYXJkRnVuYyIsImlhdCI6MTU4MTYwMTg4MTEzMywiYXVkIjoicHJvZHVjdGlvbiIsImlkIjoiT2FELWs1WDYifQ.jGvz-gUpDewvwUbZCMXQmpPqt1Jm2bVAS6YIRM9Rq8ZNGo1gZtPjbvogXVUhDbdW5mV3qmi-cj8aENFeYj9lVttqnymt_bQ8K_BpLwYEJlWcapds9oRGEvZZeWSRjPoKgjz5Uj5S44ZPuQhUcpGknOh0x4YoKKAbXzTYSqVmbt89BDS3H1B79c1IuUgAzAIE2cmb4Ti2dDmyYn9bud6TXYL_PqAYapO-VNgrXw0-iBRpD94mb47Oh5J34etCfeIwX33-eRkOwtfiFUuyUP6iBC89HdV_apf8pj-Qvkr2zScGJAF2AAMKnLNot_fS70B5gbmOW6ZitTqsdbwzcUjONw",
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
					"reference": "eyJhbGcqsdbwzcUjONw"
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
})

