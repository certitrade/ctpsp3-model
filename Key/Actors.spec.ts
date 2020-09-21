import { Key } from "./index"

const secrets = {
	signing: "secret",
	property: "secret1",
	signingV1: "secret2",
	propertyV1: "secret3",
}

const unpacked: Key = {
	sub: "testtest",
	iss: "http://localhost:7071",
	aud: "private",
	iat: 1583504065,
	name: "Test AB",
	url: "http://example.com",
	card: {
		url: "http://localhost:7082",
		id: "test",
		country: "SE",
		acquirer: {
			protocol: "clearhaus",
			url: "https://gateway.test.clearhaus.com",
			key: "36e74a69-7fee-4a37-bcd9-6a1422028ff3",
			bin: { visa: "438309", mastercard: "526571" },
		},
		mid: "1234",
		mcc: "1234",
		emv3d: {
			protocol: "ch3d1",
			url: "http://localhost:7082/ch3d1sim",
			key: "no-key",
		},
	},
}

const cardOnlyPrivate =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjcwNzEiLCJpYXQiOjE1ODM1MDQwNjUsInN1YiI6InRlc3R0ZXN0IiwiYXVkIjoicHJpdmF0ZSIsIm5hbWUiOiJUZXN0IEFCIiwidXJsIjoiaHR0cDovL2V4YW1wbGUuY29tIiwiY2FyZCI6eyJ1cmwiOiJodHRwOi8vbG9jYWxob3N0OjcwODIiLCJpZCI6InRlc3QiLCJjb3VudHJ5IjoiU0UiLCJhY3F1aXJlciI6ImxZeE9lRjRkUldaS0Jua0hKNVBOYUduel9KYlF4UVZLV3hiaFBSZVJxMHVablM5ZDd0LWJOS1BLNXpkTjlYQ0pKakloTjI2Y0xRZ3lPeDJ1dWNDeFRHMGlMQ0pyWlhraU9pSXpObVUzTkdFMk9TMDNabVZsTFRSaE16Y3RZbU5rT1MwMllURTBNakl3TWpobVpqTWlMQ0ppYVc0aU9uc2lkbWx6WVNJNklqUXpPRE13T1NJc0ltMWhjM1JsY21OaGNtUWlPaUkxTWpZMU56RWlmWDAiLCJtaWQiOiIxMjM0IiwibWNjIjoiMTIzNCIsImVtdjNkIjoiand3MW8xU09DdUhWT0JyaXl6SDl2U2xVWEttSXEySHI1TG85WXNFbFYzUEZfWjFBRnBnMnhqWGl5b2F3WTB3dWhDVGpJN0JZRGFTZEc4di1WSUkxNVRvaWJtOHRhMlY1SW4wIn19.O67yvAWmEfI9zG6dhTxvXS83fImyUx5d8nar-A0XdQA"

const verifier = Key.getVerifier(secrets)
const issuer = Key.getIssuer(secrets)
describe("Actors", () => {
	it("Verify private Cardonly", async () => {
		const verified = await verifier?.verify(cardOnlyPrivate)
		expect(Key.is(verified)).toEqual(true)
	})
	it("Issue something", async () => {
		const token = issuer ? await issuer.sign(unpacked) : undefined
		expect(await verifier?.verify(token)).toEqual(unpacked)
	})
})
