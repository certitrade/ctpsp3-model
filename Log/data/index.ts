import * as log from "./log.json"

export function get<T extends { [property: string]: any }>(name: string): T[] {
	let result: { [property: string]: any }[]
	switch (name) {
		case "log":
			result = log
			break
		default:
			result = []
			break
	}
	return result as T[]
}
