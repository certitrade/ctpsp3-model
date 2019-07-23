import { Status } from "./Status"
import { Event } from "./Event"

export interface Item {
	number?: string
	name: string
	price: number
	quantity: number
	unit?: string
	vat?: number
	rebate?: number
	status?: Status[]
}
export namespace Item {
	export function is(value: Item | any): value is Item {
		return typeof(value) == "object" &&
			(typeof(value.number) == "string" || value.number == undefined) &&
			typeof(value.name) == "string" &&
			typeof(value.price) == "number" &&
			typeof(value.quantity) == "number" &&
			(typeof(value.unit) == "string" || value.unit == undefined) &&
			(typeof(value.vat) == "number" || value.vat == undefined) &&
			(Array.isArray(value.status) && value.status.length == value.quantity && value.status.every(Status.is) || value.status == undefined)
	}
	export function canBe(value: number | Item | Item[] | any): value is number | Item | Item[] {
		return typeof(value) == "number" || Item.is(value) || (Array.isArray(value) && value.every(Item.is))
	}
	export function amount(item: number | Item | Item[]): number {
		return typeof(item) == "number" ? item :
			Item.is(item) ? (item.price - (item.rebate || 0) + (item.vat || 0)) * item.quantity :
			Array.isArray(item) ? item.map(i => amount(i)).reduce((sum, current) => sum + current, 0) :	0
	}
	export function vat(item: number | Item | Item[]): number {
		return typeof(item) == "number" ? item :
			Array.isArray(item) ? item.map(i => vat(i)).reduce((sum, current) => sum + current, 0) :
			Item.is(item) ? item.vat || 0 : 0
	}
	export function asArray(items: number | Item | Item[]): Item[] {
		return Array.isArray(items) ? items :
			typeof(items) == "number" ? [{ name: "", price: items, quantity: 1 }] :
			[ items ]
	}
	export function equals(left: Item, right: Item){
		return left.number == right.number &&
		left.name == right.name &&
		left.price == right.price &&
		left.unit == right.unit &&
		left.vat == right.vat &&
		left.rebate == right.rebate
	}
	export function applyEvent(items: Item[], event: Event) {
		for (const item of Item.asArray(event.items || items)) {
			applyItem(items, event.type, item.quantity, item)
		}
	}
	export function applyItem(items: Item[], event: Event.Type, quantity: number, match: Item) {
		for (const item of items) {
			if (!item.status)
				item.status = Array<Status>(item.quantity).fill("created")
			if (quantity > 0 && Item.equals(item, match)) {
				for (let j = 0; j < item.status!.length && quantity > 0; j++) {
					let next: Status | undefined
					if (next = Status.change(item.status![j], event)) {
						item.status![j] = next
						quantity--
					}
				}
			}
		}
	}
}
