export interface Item {
	name: string
	price: number
	quantity: number
	unit?: string
	vat?: number
}

export function isItem(item: Item | any): item is Item {
	return typeof(item) == "object" && typeof(item.name) == "string" && typeof(item.price) == "number" && typeof(item.quantity) == "number"
}
