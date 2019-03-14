export interface Name {
	first?: string
	last?: string
}
export namespace Name {
	export function is(value: Name | any): value is Name {
		return (typeof(value.first) == "string" || value.first == undefined) &&
			(typeof(value.last) == "string" || value.last == undefined)
	}
}
