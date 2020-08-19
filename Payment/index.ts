import { Identifier } from "authly"
import { Type as PType } from "./Type"
import { Verify as PVerify } from "./Verify"
import { Status as PStatus } from "./Status"
import { Card as PCard } from "./Card"
import { Installment as PInstallment } from "./Installment"
import { Invoice as PInvoice } from "./Invoice"
import { Defer as PDefer } from "./Defer"
import { Swish as PSwish } from "./Swish"
import { Account as PAccount } from "./Account"
import { Base as PBase } from "./Base"

export type Payment = PCard | PInstallment | PInvoice | PDefer | PSwish | PAccount

export namespace Payment {
	export function is(value: Payment | any): value is Payment {
		return (
			PCard.is(value) ||
			PInstallment.is(value) ||
			PInvoice.is(value) ||
			PDefer.is(value) ||
			PSwish.is(value) ||
			PAccount.is(value)
		)
	}
	export function hasVerify(
		payment: Payment | (Payment & { verify: PVerify })
	): payment is Payment & { verify: PVerify } {
		return PVerify.is((payment as Payment & { verify?: PVerify }).verify)
	}
	export function sort(value: Payment[], property: "created"): Payment[] {
		return value.sort(getComparer(property))
	}
	export function getComparer(property: "created"): (left: Payment, right: Payment) => number {
		let result: (left: Payment, right: Payment) => number
		switch (property) {
			case "created":
			default:
				result = (left: Payment, right: Payment) =>
					left.created < right.created ? 1 : left.created > right.created ? -1 : 0
				break
		}
		return result
	}
	export function filter(value: Payment[], property: "status", criterion: PStatus): Payment[]
	export function filter(value: Payment[], property: "type", criterion: PType): Payment[]
	export function filter(
		value: Payment[],
		property: "type" | "status",
		criterion: string | Identifier | PStatus
	): Payment[] {
		return value.filter(payment => payment[property] == criterion)
	}
	export type Creatable =
		| PCard.Creatable
		| PInstallment.Creatable
		| PInvoice.Creatable
		| PDefer.Creatable
		| PAccount.Creatable
	export namespace Creatable {
		export function is(value: Creatable | any): value is Creatable {
			return (
				PCard.Creatable.is(value) ||
				PInstallment.Creatable.is(value) ||
				PInvoice.Creatable.is(value) ||
				PDefer.Creatable.is(value) ||
				PAccount.Creatable.is(value)
			)
		}
	}
	export function getCsvHeaders(): string {
		return PBase.getCsvHeaders()
	}
	export function toCsv(data: Payment): string {
		return PBase.toCsv(data)
	}
	export type Type = PType
	export namespace Type {
		export const is = PType.is
	}
	export type Verify = PVerify
	export namespace Verify {
		export const is = PVerify.is
		export type Iframe = PVerify.Iframe
		export namespace Iframe {
			export const is = PVerify.Iframe.is
		}
		export type Redirect = PVerify.Redirect
		export namespace Redirect {
			export const is = PVerify.Redirect.is
		}
	}
	export type Status = PStatus
	export namespace Status {
		export const is = PStatus.is
	}

	export type Card = PCard
	export namespace Card {
		export const is = PCard.is
		export type Creatable = PCard.Creatable
		export namespace Creatable {
			export const is = PCard.Creatable.is
			export const flaw = PCard.Creatable.flaw
			export const from = PCard.Creatable.from
		}
		export type Scheme = PCard.Scheme
		export namespace Scheme {
			export const is = PCard.Scheme.is
		}
	}

	export type Installment = PInstallment
	export namespace Installment {
		export const is = PInstallment.is
		export type Creatable = PInstallment.Creatable
		export namespace Creatable {
			export const is = PInstallment.Creatable.is
		}
		export type Plan = PInstallment.Plan
		export namespace Plan {
			export const is = PInstallment.Plan.is
		}
	}

	export type Invoice = PInvoice
	export namespace Invoice {
		export const is = PInvoice.is
		export type Creatable = PInvoice.Creatable
		export namespace Creatable {
			export const is = PInvoice.Creatable.is
			export const flaw = PInvoice.Creatable.flaw
		}
		export type Terms = PInvoice.Terms
		export namespace Terms {
			export const is = PInvoice.Terms.is
		}
	}

	export type Defer = PDefer
	export namespace Defer {
		export const is = PDefer.is
		export type Creatable = PDefer.Creatable
		export namespace Creatable {
			export const is = PDefer.Creatable.is
		}
		export type Method = PDefer.Method
		export namespace Method {
			export const is = PDefer.Method.is
		}
	}

	export type Swish = PSwish
	export namespace Swish {
		export const is = PSwish.is
		export type Creatable = PSwish.Creatable
		export namespace Creatable {
			export const is = PSwish.Creatable.is
			export const flaw = PSwish.Creatable.flaw
		}
	}

	export type Account = PAccount
	export namespace Account {
		export const is = PAccount.is
		export type Creatable = PAccount.Creatable
		export namespace Creatable {
			export const is = PAccount.Creatable.is
			export const flaw = PAccount.Creatable.flaw
		}
	}
}
