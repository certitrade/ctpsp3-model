import { Type as PType } from "./Type"
import { Card as PCard } from "./Card"
import { Installment as PInstallment } from "./Installment"
import { Invoice as PInvoice } from "./Invoice"

export type Payment = PCard | PInstallment | PInvoice

// tslint:disable: no-shadowed-variable
export namespace Payment {
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
		export const is = PCard.is
		export type Plan = PInstallment.Plan
		export namespace Plan {
			export const is = PInstallment.Plan.is
		}
	}

	export type Invoice = PInvoice
	export namespace Invoice {
		export const is = PCard.is
		export type Terms = PInvoice.Terms
		export namespace Terms {
			export const is = PInvoice.Terms.is
		}
	}
}
