export interface Creatable {
	contact?: string
}

export namespace Creatable {
	export function is(value: Creatable | any): value is Creatable {
		return typeof value == "object" && (value.contact == "string" || value.contact == undefined)
	}
}
