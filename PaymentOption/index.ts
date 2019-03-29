import { PaymentOption as Parent } from "./PaymentOption"
import { Type as POType } from "./Type"
import { Card as POCard } from "./Card"
import { Direct as PODirect } from "./Direct"
import { Installment as POInstallment } from "./Installment"
import { Invoice as POInvoice } from "./Invoice"
import { Mobile as POMobile } from "./Mobile"

export type PaymentOption = POCard | PODirect | POInstallment | POInvoice | POMobile
export namespace PaymentOption {
	export const is = Parent.is
	export type Type = POType
	export type Card = POCard
	// tslint:disable: no-shadowed-variable
	export namespace Card {
		export const is = POCard.is
	}
	export type Direct = PODirect
	export namespace Direct {
		export const is = PODirect.is
	}
	export type Installment = POInstallment
	export namespace Installment {
		export const is = POInstallment.is
		export type Plan = POInstallment.Plan
	}
	export type Invoice = POInvoice
	export namespace Invoice {
		export const is = POInvoice.is
		export type Option = POInvoice.Option
	}
	export type Mobile = POMobile
	export namespace Mobile {
		export const is = POMobile.is
	}
}
