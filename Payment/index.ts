import { Type as PType } from "./Type"
import { Card as PCard } from "./Card"
import { Installment as PInstallment } from "./Installment"
import { Invoice as PInvoice } from "./Invoice"
import { Defer as PDefer } from "./Defer"

export type Payment = PCard | PInstallment | PInvoice | PDefer

// tslint:disable: no-shadowed-variable
export namespace Payment {
	export function is(value: Payment | any) {
		return PCard.is(value) ||
			PInstallment.is(value) ||
			PInvoice.is(value) ||
			PDefer.is(value)
	}
	export type Type = PType
	export namespace Type {
		export const is = PType.is
	}

	export type Card = PCard
	export namespace Card {
		export const is = PCard.is
		export type Issuer = PCard.Issuer
		export namespace Issuer {
			export const is = PCard.Issuer.is
		}
	}

	export type Installment = PInstallment
	export namespace Installment {
		export const is = PInstallment.is
		export type Plan = PInstallment.Plan
		export namespace Plan {
			export const is = PInstallment.Plan.is
		}
	}

	export type Invoice = PInvoice
	export namespace Invoice {
		export const is = PInvoice.is
		export type Terms = PInvoice.Terms
		export namespace Terms {
			export const is = PInvoice.Terms.is
		}
	}

	export type Defer = PDefer
	export namespace Defer {
		export const is = PDefer.is
		export type Method = PDefer.Method
		export namespace Method {
			export const is = PDefer.Method.is
		}
	}
}
