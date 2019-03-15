import { PaymentOption as Parent } from "./PaymentOption"
import { Type as POType } from "./Type"
import { Card as POCard } from "./Card"
import { Direct as PODirect } from "./Direct"
import { Installment as POInstallment } from "./Installment"
import { Invoice as POInvoice } from "./Invoice"
import { Mobile as POMobile } from "./Mobile"

export type PaymentOption = Parent
export namespace PaymentOption {
	export type Type = POType
	export type Card = POCard
	export type Direct = PODirect
	export type Installment = POInstallment
	export type Invoice = POInvoice
	export type Mobile = POMobile
}
