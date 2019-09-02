import * as gracely from "gracely"
import * as authly from "authly"
import { Credentials } from "./Credentials"
import { User } from "./User"
import { fetch, RequestInit } from "./fetch"

export abstract class Connection {
	static baseUrl: string = "/"
	static user?: User
	static key?: authly.Token
	static reauthenticate?: () => Promise<[User, authly.Token] | gracely.Error>
	private constructor() { }
	static async login(user: string, password: string): Promise<User | gracely.Error> {
		const response = await fetch(Connection.baseUrl + "me", {
			method: "GET",
			headers: {
				"Accept": "application/json; charset=utf-8",
				"Authorization": Credentials.toBasic({ user, password }),
			},
		})
		const contentTypeHeader = response.headers.get("content-type")
		let result: User | gracely.Error
		switch (contentTypeHeader) {
			case "application/json; charset=utf-8":
				result = await response.json()
				break
			default:
				result = gracely.client.notFound() // TODO: local errors?
		}
		return result
	}
	private static async getToken(): Promise<authly.Token | undefined> {
		let result: authly.Token | undefined = Connection.key && Connection.key
		if (!result && Connection.reauthenticate)  {
			const response = await Connection.reauthenticate()
			if (!gracely.Error.is(response)) {
				Connection.user = response[0]
				Connection.key = response[1]
				result = Connection.key && Connection.key
			}
		}
		return result
	}
	private static async fetch<T>(resource: string, init: RequestInit, body?: any): Promise<T | gracely.Error> {

		const url = Connection.baseUrl + resource
		if (body)
			init.body = JSON.stringify(body)
		init = {
			...init,
			headers: {
				...init.headers,
				"Content-Type": "application/json; charset=utf-8",
				Accept: "application/json; charset=utf-8",
				Authorization: `Bearer ${ await Connection.getToken() }`,
			},
		}
		const response = await fetch(url, init)
		return response.headers.get("Content-Type") == "application/json; charset=utf-8" ? await response.json() as T | gracely.Error : { status: response.status, type: "unknown" }
	}
	static get<T>(resource: string): Promise<T | gracely.Error> {
		return Connection.fetch<T>(resource, { method: "GET" })
	}
	static put<T>(resource: string, body: any): Promise<T | gracely.Error> {
		return Connection.fetch<T>(resource, { method: "PUT" }, body)
	}
	static post<T>(resource: string, body: any): Promise<T | gracely.Error> {
		return Connection.fetch<T>(resource, { method: "POST" }, body)
	}
	static patch<T>(resource: string, body: any): Promise<T | gracely.Error> {
		return Connection.fetch<T>(resource, { method: "PATCH" }, body)
	}
	static delete<T>(resource: string): Promise<T | gracely.Error> {
		return Connection.fetch(resource, { method: "DELETE" })
	}
	static options<T>(resource: string): Promise<T | gracely.Error> {
		return Connection.fetch(resource, { method: "OPTIONS" })
	}
}
function hasMerchant(value: any | { merchant: { configuration: { private: string } } }): value is { merchant: { configuration: { private: string } } } {
	return typeof(value) == "object" &&
		typeof(value.merchant) == "object" &&
		typeof(value.merchant.configuration) == "object" &&
		typeof(value.merchant.configuration.private) == "string"
}
