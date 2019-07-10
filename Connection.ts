import * as gracely from "gracely"
import { Credentials } from "./Credentials"
import { User } from "./User"
import { fetch, RequestInit } from "./fetch"

export abstract class Connection {
	static baseUrl: string = ""
	static user?: User
	private static token?: string
	private constructor() { }
	static async login(user: string, password: string): Promise<User | gracely.Error> {
		const response = await fetch(Connection.baseUrl + "/me", {
			method: "GET",
			headers: {
				"Accept": "application/json; charset=utf-8",
				"Authorization": Credentials.toBasic({ user, password }),
			},
		})
		const contentTypeHeader = response.headers.get("content-type")
		const contentType = contentTypeHeader ? contentTypeHeader[0].split(";")[0] : ""
		let result: User | gracely.Error
		switch (contentType) {
			case "application/json":
				const data = await response.json()
				if (gracely.Error.is(data))
					result = data
				else if (!User.is(data))
					result = gracely.server.unavailable() // TODO: local errors?
				else if (!hasPartner(data))
					result = gracely.client.unauthorized() // TODO: local errors?
				else {
					Connection.token = data.partner.private
					delete data.partner
					result = Connection.user = data
				}
				default:
				result = gracely.client.notFound() // TODO: local errors?
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
				"Accept": "application/json; charset=utf-8",
				Authorization: `Bearer ${ Connection.token }`,
			},
		}
		const response = await fetch(url, init)
		return await response.json() as T | gracely.Error
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
function hasPartner(value: any | { partner: { private: string } }): value is { partner: { private: string } } {
	return typeof(value) == "object" && typeof(value.partner) == "object" && typeof(value.partner.private) == "string"
}
