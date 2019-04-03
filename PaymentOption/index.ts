import { Base } from "./Base"
import { Type as POType } from "../Payment/Type"
import { Card as POCard } from "./Card"
import { Direct as PODirect } from "./Direct"
import { Installment as POInstallment } from "./Installment"
import { Invoice as POInvoice } from "./Invoice"
import { Mobile as POMobile } from "./Mobile"

export type PaymentOption = POCard | PODirect | POInstallment | POInvoice | POMobile
export namespace PaymentOption {
	export const is = Base.is
	export type Type = POType
	export type Card = POCard
	// tslint:disable: no-shadowed-variable
	export namespace Card {
		export const is = POCard.is
		export type Issuer = POCard.Issuer
		export namespace Issuer {
			export const is = POCard.Issuer
		}
	}
	export type Direct = PODirect
	export namespace Direct {
		export const is = PODirect.is
	}
	export type Installment = POInstallment
	export namespace Installment {
		export const is = POInstallment.is
		export type Plan = POInstallment.Plan
		export namespace Plan {
			export const is = POInstallment.Plan.is
		}
	}
	export type Invoice = POInvoice
	export namespace Invoice {
		export const is = POInvoice.is
		export type Alternative = POInvoice.Terms
		export namespace Alternative {
			export const is = POInvoice.Terms.is
		}
	}
	export type Mobile = POMobile
	export namespace Mobile {
		export const is = POMobile.is
	}
}
