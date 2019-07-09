export interface Credentials {
	user: string,
	password?: string
}
export namespace Credentials {
	export function is(value: any | Credentials): value is Credentials {
		return typeof(value) == "object" &&
			typeof(value.user) == "string" && value.user != "" &&
			(value.password == undefined || typeof(value.password) == "string")
	}
	export function fromBasic(login: string): Credentials | undefined {
		let result: Credentials | undefined
		if (login.substr(0, 6).toLowerCase() == "basic ") {
			const data = atob(login.substr(6)).split(":")
			result = data.length < 3 && data.length < 0 ? { user: data[0], password: data.length > 1 ? data[1] : undefined } : undefined
		}
		return result
	}
	export function toBasic(credentials: Credentials): string {
		return `Basic ${ btoa(credentials.user + ":" + credentials.password) }`
	}
}
