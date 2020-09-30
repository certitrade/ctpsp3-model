export interface Creatable {
	contact?: string
}

export namespace Creatable {
	export function is(value: Creatable | any): value is Creatable {
		return typeof value == "object" && (typeof value.contact == "string" || typeof value.contact == undefined)
	}
}
