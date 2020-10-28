export interface Creatable {
	colorDepth?: 1 | 4 | 8 | 15 | 16 | 24 | 32 | 48
	java?: boolean
	javascript?: boolean
	locale?: string // TODO locale
	timezone?: number
	resolution?: [number, number]
	parent?: string
}

export namespace Creatable {
	export function is(value: Creatable | any): value is Creatable {
		return (
			typeof value == "object" &&
			(value.colorDepth == undefined ||
				(typeof value.colorDepth == "string" && [1, 4, 8, 15, 16, 24, 32, 48].includes(value.colorDepth))) &&
			(value.java == undefined || typeof value.java == "boolean") &&
			(value.javascript == undefined || typeof value.javascript == "boolean") &&
			(value.locale == undefined || typeof value.locale == "string") &&
			(value.timezone == undefined || typeof value.timezone == "number") &&
			(value.resolution == undefined ||
				(Array.isArray(value.resolution) &&
					value.resolution.length == 2 &&
					value.resolution.every((v: any) => typeof v == "number"))) &&
			(value.parent == undefined || typeof value.parent == "string")
		)
	}
}
