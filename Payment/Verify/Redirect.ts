export interface Redirect {
	mode: "redirect"
	method: "post" | "get"
	target: string
}

export namespace Redirect {
	export function is(value: Redirect | any): value is Redirect {
		return (
			typeof value == "object" &&
			value.mode == "redirect" &&
			(value.method == "post" || value.method == "get") &&
			typeof value.target == "string"
		)
	}
}
