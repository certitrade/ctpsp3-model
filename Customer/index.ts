import * as isoly from "isoly"
import * as selectively from "selectively"
import * as authly from "authly"
import { Contact } from "@payfunc/model-base"
import { Frequency } from "../Frequency"
import { Item } from "../Item"
import { Schedule } from "../Schedule"
import { Subscription } from "../Subscription"
import { Creatable as CustomerCreatable } from "./Creatable"
import { Link as CustomerLink } from "./Link"
import { Method as CustomerMethod } from "./Method"
import { Status as CustomerStatus } from "./Status"

export interface Customer {
	id: authly.Identifier
	number?: string
	contact?: Contact
	method: CustomerMethod[]
	link?: CustomerLink[]
	status?: CustomerStatus
	subscription?: Subscription[]
	balance: Item[]
	total: number
	due?: isoly.Date
	currency: isoly.Currency
	limit?:
		| number
		| {
				hard?: number
				soft?: number
				margin?: number
		  }
	schedule: Frequency | Schedule
}

export namespace Customer {
	export function is(value: Customer | any): value is Customer {
		return (
			typeof value == "object" &&
			authly.Identifier.is(value.id, 16) &&
			(value.number == undefined || typeof value.number == "string") &&
			(value.contact == undefined || Contact.is(value.contact)) &&
			Array.isArray(value.method) &&
			value.method.every(CustomerMethod.is) &&
			(value.subscription == undefined ||
				(Array.isArray(value.subscription) && value.subscription.every(Subscription.is))) &&
			(value.status == undefined || CustomerStatus.is(value.status)) &&
			isoly.Currency.is(value.currency) &&
			(value.limit == undefined ||
				typeof value.limit == "number" ||
				(typeof value.limit == "object" &&
					(value.limit.hard == undefined || typeof value.limit.hard == "number") &&
					(value.limit.soft == undefined || typeof value.limit.soft == "number") &&
					(value.limit.margin == undefined || typeof value.limit.margin == "number"))) &&
			(Frequency.is(value.schedule) || Schedule.is(value.schedule)) &&
			Array.isArray(value.balance) &&
			value.balance.every(Item.is) &&
			typeof value.total == "number"
		)
	}
	export function generateId(): authly.Identifier {
		return authly.Identifier.generate(16)
	}
	export type Creatable = CustomerCreatable
	export namespace Creatable {
		export const is = CustomerCreatable.is
	}
	export type Link = CustomerLink
	export namespace Link {
		export const is = CustomerLink.is
		export type Creatable = CustomerLink.Creatable
		export namespace Creatable {
			export const is = CustomerLink.Creatable.is
		}
	}
	export type Method = CustomerMethod
	export namespace Method {
		export const is = CustomerMethod.is
		export const verify = CustomerMethod.verify
		export type Card = CustomerMethod.Card
		export namespace Card {
			export const is = CustomerMethod.Card.is
			export type Creatable = CustomerMethod.Card.Creatable
			export namespace Creatable {
				export const is = CustomerMethod.Card.Creatable.is
				export const verify = CustomerMethod.Card.Creatable.verify
				export type Token = CustomerMethod.Card.Creatable.Token
				export namespace Token {
					export const is = CustomerMethod.Card.Creatable.Token.is
				}
			}
		}
		export type Creatable = CustomerMethod.Creatable
		export namespace Creatable {
			export const is = CustomerMethod.Creatable.is
		}
		export type Type = CustomerMethod.Type
		export namespace Type {
			export const is = CustomerMethod.Type.is
		}
	}
	export type Status = CustomerStatus
	export namespace Status {
		export const is = CustomerStatus.is
		export const getStatus = CustomerStatus.getStatus
		export const types = CustomerStatus.types
	}
	export const template = new selectively.Type.Object({
		id: new selectively.Type.String(),
		number: new selectively.Type.String(),
		contact: Contact.template,
		method: CustomerMethod.Card.template,
		status: new selectively.Type.Array([
			new selectively.Type.Union([
				new selectively.Type.String("created"),
				new selectively.Type.String("pending"),
				new selectively.Type.String("active"),
				new selectively.Type.String("inactive"),
				new selectively.Type.String("suspended"),
			]),
		]),
		subscription: new selectively.Type.Array([Subscription.template]),
		balance: Item.template,
		total: new selectively.Type.Number(),
		due: new selectively.Type.String(),
		currency: new selectively.Type.Union(isoly.Currency.types.map(c => new selectively.Type.String(c))),
		limit: new selectively.Type.Union([
			new selectively.Type.Number(),
			new selectively.Type.Object({
				hard: new selectively.Type.Number(),
				soft: new selectively.Type.Number(),
				margin: new selectively.Type.Number(),
			}),
		]),
		schedule: Frequency.template,
	})
}
