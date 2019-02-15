export interface Item {
	name: string
	price: number
	quantity: number
	unit?: string
	vat?: number
}
// tslint:disable-next-line: no-namespace
export namespace Item {
	export function is(value: Item | any): value is Item {
		return typeof(value.name) == "string" &&
		typeof(value.price) == "number" &&
		typeof(value.quantity) == "number" &&
		(typeof(value.unit) == "string" || value.unit == undefined) &&
		(typeof(value.vat) == "number" || value.vat == undefined)
	}
}
