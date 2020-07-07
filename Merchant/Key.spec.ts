import * as model from "../index"
import * as card from "@cardfunc/model"

describe("model.Merchant.Key", () => {
	const v1Private: model.Merchant.V1.Key = {
		"iss": "http://localhost:7071",
		"iat": 1593589747536,
		"sub": "testtest",
		"name": "testtest",
		"option": {
			"email": {
				"key": "akey",
				"notify": "notifyvalue"
			},
			"mash": {
					"url": "https://mash.example/api",
					"user": "test01",
					"key": "akey",
					"merchant": 5
			},
			"sms": {
					"key": "akey",
					"sender": "TestMerchant"
			},
			"card": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjcwODIiLCJpYXQiOjE1ODM1MDM3MzA5NzAsImF1ZCI6InByaXZhdGUiLCJzdWIiOiJ0ZXN0IiwiYWdlbnQiOiJ0ZXN0IiwidHlwZSI6InRlc3QiLCJpZCI6InRlc3QiLCJuYW1lIjoiVGVzdCBBQiIsInVybCI6Imh0dHA6Ly9leGFtcGxlLmNvbSIsImRlc2NyaXB0b3IiOiJ0ZXN0IHRyYW5zYWN0aW9uIiwiY291bnRyeSI6IlNFIiwiYWNxdWlyZXIiOiJKdVpYd2swY2xzcnBMNGg1TDhqcTVsLThzWDFGZXdMWnBsalNKNlJITzcwWGNYU2d0MXdCenRHUlJoUTF3WW8zRUpTZ2J6Q0ZhTFkwVWpmaDF1aGNMRzBpTENKclpYa2lPaUl6Tm1VM05HRTJPUzAzWm1WbExUUmhNemN0WW1Oa09TMDJZVEUwTWpJd01qaG1aak1pTENKaWFXNGlPbnNpZG1sellTSTZJalF6T0RNd09TSXNJbTFoYzNSbGNtTmhjbVFpT2lJMU1qWTFOekVpZlgwIiwibWlkIjoiMTIzNCIsIm1jYyI6IjEyMzQiLCJlbXYzZCI6IlFQbDlaczdtemRDMUlBLVpLd1BQYnRSOS01VjlfYUJYcTR2VU5jN1hnbEtLOTlMQ0I2U0FneUhvcWFTU1I2VG56X2d4MVpKNmM4X2tHT1VNUFRYcnJqb2libTh0YTJWNUluMCJ9.U4Hpfcupl7tgjk-IVaYCemzuNsG15EZY1IxNgEdt02s",
		},
		"aud": [
			"private",
			"public"
		]
	}
	const v1PrivateCard: card.Merchant.V1.Key = {
		acquirer: {
			bin: {
				mastercard: "1234",
				visa: "1234",
			},
			key: "1234-1234-1234",
			protocol: "clearhaus",
			url: "https://gateway.test.clearhaus.com",
		},
		agent: "test",
		aud: "private",
		country: "SE",
		descriptor: "test transaction",
		emv3d: {
			protocol: "ch3d1",
			url: "http://localhost:7082/ch3d1sim",
			key: "no-key"
		},
		iat: 1583503730970,
		id: "test",
		iss: "http://localhost:7082",
		mcc: "1234",
		mid: "1234",
		name: "Test AB",
		sub: "test",
		type: "test",
		url: "http://example.com",
	}
	const v1Public: model.Merchant.V1.Key = {
		"iss": "http://localhost:7071",
		"iat": 1593589747536,
		"sub": "testtest",
		"name": "testtest",
		"option": {
			"email": {
				"key": "akey",
				"notify": "notifyvalue"
			},
			"mash": {
					"url": "https://mash.example/api",
					"user": "test01",
					"key": "akey",
					"merchant": 5
			},
			"sms": {
					"key": "akey",
					"sender": "TestMerchant"
			},
			"card": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjcwODIiLCJpYXQiOjE1ODM1MDQwMDM0OTUsImF1ZCI6InB1YmxpYyIsInN1YiI6InRlc3QiLCJhZ2VudCI6InRlc3QiLCJ0eXBlIjoidGVzdCIsImlkIjoidGVzdCIsIm5hbWUiOiJUZXN0IEFCIiwidXJsIjoiaHR0cDovL2V4YW1wbGUuY29tIiwiZGVzY3JpcHRvciI6InRlc3QgdHJhbnNhY3Rpb24iLCJjb3VudHJ5IjoiU0UiLCJhY3F1aXJlciI6IlhpU3dmRVpvOUxxMHBLbUlIQ2h0UXRrV3NTeGNtLVRoOWN1XzNPb1FBd3hZdU9qdUg0Vk1hYy1PdWs5dnhOLUNqRzBYdi1jV2pxbGZVVmtrRlB3MnUyMGlMQ0pyWlhraU9pSXpObVUzTkdFMk9TMDNabVZsTFRSaE16Y3RZbU5rT1MwMllURTBNakl3TWpobVpqTWlMQ0ppYVc0aU9uc2lkbWx6WVNJNklqUXpPRE13T1NJc0ltMWhjM1JsY21OaGNtUWlPaUkxTWpZMU56RWlmWDAiLCJtaWQiOiIxMjM0IiwibWNjIjoiMTIzNCIsImVtdjNkIjoiS2VHbno3N1UtLWE5Nmg5VHFiSkVWLVlPd0hlN0ttb3I2MkdSeXlDZDNmaU5TMjBtU0JfakY4dUZGOG5hTUhBUjF3OG1PVnhmMXlSQUpkemMyT2hoN1RvaWJtOHRhMlY1SW4wIn0.8qimmLu-u1EElRoJCUKEViQRnp14BFU33eyiyw7DMGQ",
		},
		"aud": "public"
	}
	const v1PublicCard: card.Merchant.V1.Key = {
		acquirer: {
			bin: {
				mastercard: "1234",
				visa: "1234",
			},
			key: "1234",
			protocol: "clearhaus",
			url: "https://gateway.test.clearhaus.com",
		},
		agent: "test",
		aud: "private",
		country: "SE",
		descriptor: "test transaction",
		emv3d: {
			protocol: "ch3d1",
			url: "http://localhost:7082/ch3d1sim",
			key: "no-key"
		},
		iat: 1583503730970,
		id: "test",
		iss: "http://localhost:7082",
		mcc: "1234",
		mid: "1234",
		name: "Test AB",
		sub: "test",
		type: "test",
		url: "http://example.com",
	}
	it("Upgrade v1 Private", async () => {
		expect(model.Merchant.V1.Key.is(v1Private)).toBeTruthy()
		const upgraded = model.Merchant.Key.upgrade(v1Private, v1PrivateCard)
		expect(upgraded).toBeTruthy()
	})
	it("Upgrade v1 Public", async () => {
		expect(model.Merchant.V1.Key.is(v1Public)).toBeTruthy()
		const upgraded = model.Merchant.Key.upgrade(v1Public, v1PublicCard)
		expect(upgraded).toBeTruthy()
	})
})
