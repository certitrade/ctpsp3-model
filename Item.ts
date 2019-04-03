export interface Item {
	name: string
	price: number
	quantity: number
	unit?: string
	vat?: number
	rebate?: number
}
export namespace Item {
	export function is(value: Item | any): value is Item {
		return typeof(value.name) == "string" &&
		typeof(value.price) == "number" &&
		typeof(value.quantity) == "number" &&
		(typeof(value.unit) == "string" || value.unit == undefined) &&
		(typeof(value.vat) == "number" || value.vat == undefined)
	}
	export function amount(item: number | Item | Item[]): number {
		return typeof(item) == "number" ? item :
			Array.isArray(item) ? item.map(i => amount(i)).reduce((sum, current) => sum + current, 0) :
			Item.is(item) ? (item.price - (item.rebate || 0) + (item.vat || 0)) * item.quantity : 0
	}
}
