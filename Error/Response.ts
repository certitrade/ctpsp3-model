import { Error } from "./Error"

export class Response {
	status: number
	headers = { "content-type": "application/json; charset=utf-8" }
	private constructor(readonly body: Error) {
		this.status = body.status
	}
	static add<T extends Error>(error: T): T & { response: Response } {
		return { ...error, response: new Response(error) }
	}
}
