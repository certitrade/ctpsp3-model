export interface Iframe {
	mode: "iframe"
	parent: string
}

export namespace Iframe {
	export function is(value: Iframe | any): value is Iframe {
		return typeof value == "object" &&
			value.mode == "iframe" &&
			typeof value.parent == "string"
	}
}
