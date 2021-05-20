import * as gracely from "gracely"
import * as selectively from "selectively"
import { Item as BaseItem } from "@payfunc/model-base"
import { Event } from "./Event"
import { StatusList } from "./Order/StatusList"
import { Status } from "./Status"

export type Item = BaseItem & {
	status?: Status[]
}
export namespace Item {
	export function is(value: Item | any): value is Item {
		return (
			typeof value == "object" &&
			((Array.isArray(value.status) && value.status.length == (value.quantity || 1) && value.status.every(Status.is)) ||
				value.status == undefined) &&
			BaseItem.is(value)
		)
	}
	export const template = new selectively.Type.Object({
		number: new selectively.Type.String(),
		name: new selectively.Type.String(),
		price: new selectively.Type.Number(),
		quantity: new selectively.Type.Number(),
		unit: new selectively.Type.String(),
		vat: new selectively.Type.Number(),
		rebate: new selectively.Type.Number(),
		status: new selectively.Type.Array([
			new selectively.Type.Union([
				new selectively.Type.String("created"),
				new selectively.Type.String("deferred"),
				new selectively.Type.String("pending"),
				new selectively.Type.String("denied"),
				new selectively.Type.String("ordered"),
				new selectively.Type.String("cancelled"),
				new selectively.Type.String("charged"),
				new selectively.Type.String("paid"),
				new selectively.Type.String("refunded"),
				new selectively.Type.String("settled"),
				new selectively.Type.String("synchronized"),
			]),
		]),
	})
	export function flaw(value: Item | any): gracely.Flaw {
		return {
			type: "model.Item",
			flaws:
				typeof value != "object"
					? undefined
					: ([
							...(BaseItem.flaw(value).flaws ?? []),
							(Array.isArray(value.status) &&
								value.status.length == (value.quantity || 1) &&
								value.status.every(Status.is)) ||
								value.status == undefined || { property: "status", type: "Status[]" },
					  ].filter(gracely.Flaw.is) as gracely.Flaw[]),
		}
	}
	export function canBe(value: number | Item | Item[] | any): value is number | Item | Item[] {
		return typeof value == "number" || Item.is(value) || (Array.isArray(value) && value.every(Item.is))
	}
	export function canBeFlaw(value: number | Item | Item[] | any): gracely.Flaw | gracely.Flaw[] {
		let result: gracely.Flaw | gracely.Flaw[]
		if (Array.isArray(value)) {
			const array: gracely.Flaw[] = []
			value.forEach(item => {
				array.push(flaw(item))
			})
			result = array
		} else
			result = flaw(value)
		return result
	}
	export const amount = BaseItem.amount
	export const fromVatInclusivePrice = BaseItem.fromVatInclusivePrice
	export const vat = BaseItem.vat
	export const asArray = BaseItem.asArray
	export const equals = BaseItem.equals
	export function applyAmountEvent(sums: StatusList, event: Event, items: number): StatusList {
		if (isItemEvent(event)) {
			let from: Status | undefined
			let to: Status | undefined
			let amount = typeof event.items == "number" ? event.items : undefined
			for (const status of Status.types) {
				to = Status.change(status, event.type)
				if (to && (amount ? (sums[status] ?? 0) >= amount : (sums[status] ?? 0) > 0)) {
					from = status
					break
				}
			}
			if (to && from && to != from) {
				if (amount)
					sums[from] = (sums[from] ?? 0) - amount
				else {
					amount = sums[from]
					sums[from] = 0
				}
				sums[to] = (amount ?? items) + (sums[to] ?? 0)
			}
		}
		return sums
	}
	export function applyEvent(items: Item[], event: Event): boolean {
		let result = true
		if (isItemEvent(event))
			for (const item of Item.asArray(event.items || items))
				result = applyItem(items, event.type, item.quantity || 1, item)
		return result
	}
	export function applyItem(items: Item[], event: Event.Type, quantity: number, match: Item): boolean {
		for (const item of items) {
			if (!item.status)
				item.status = Array<Status>(item.quantity || 1).fill("created")
			if (quantity > 0 && Item.equals(item, match) && item.status) {
				for (let j = 0; j < item.status.length && quantity > 0; j++) {
					let next: Status | undefined
					if (item.status[j])
						if ((next = Status.change(item.status[j], event))) {
							item.status[j] = next
							quantity--
						}
				}
			}
		}
		return quantity > 0 ? false : true
	}
	export function copyItem(item: Item): Item {
		return { ...item, status: item.status ? [...item.status] : undefined }
	}
	export function isEventAllowed(items: Item[], newEvent: Event): boolean {
		const copiedItems = items.map(item => copyItem(item))
		return applyEvent(copiedItems, newEvent)
	}
	export function isItemEvent(event: Event): boolean {
		return event.type != "fail" && event.type != "settle"
	}
	export const getCsvHeaders = BaseItem.getCsvHeaders
	export const toCsv = BaseItem.toCsv
}
