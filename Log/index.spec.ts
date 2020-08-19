import * as authly from "authly"
import * as servly from "servly"
import * as model from "../index"

describe("Log", () => {
	const log: model.Log = {
		id: "JeJAmRt9hnDi9tSb",
		system: "payfunc/backend",
		invocation: "e5716318-19c4-498f-b00d-c734fe08c13c",
		point: "version",
		entries: [
			{
				created: "2020-04-21T22:37:57.085Z",
				step: "initialized",
				level: "trace",
				content: {
					url: "http://localhost:7071/version",
					baseUrl: "http://localhost:7071",
					query: {},
					parameter: {},
					header: {
						accept: "*/*",
						host: "localhost:7071",
						userAgent: "insomnia/7.1.1",
					},
					method: "GET",
					raw: {},
					body: {},
				},
			},
		],
	}
	it("is", () => expect(model.Log.is(log)).toEqual(true))
	it("is parts", () => {
		expect(model.Log.is(log)).toEqual(true)
		expect(authly.Identifier.is(log.id, 16)).toEqual(true)
		expect(log.merchant == undefined || authly.Identifier.is(log.merchant, 8)).toEqual(true)
		expect(log.reference == undefined || model.Log.Reference.is(log.reference)).toEqual(true)
		expect(log.client == undefined || authly.Identifier.is(log.client)).toEqual(true)
		expect(log.system == undefined || model.Log.System.is(log.system)).toEqual(true)
		expect(Array.isArray(log.entries) && log.entries.every(model.Log.Entry.is)).toEqual(true)
		expect(servly.Log.is(log)).toEqual(true)
	})
})
