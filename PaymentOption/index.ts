import { Base } from "./Base"
import { Type as POType } from "../Payment/Type"
import { Card as POCard } from "./Card"
import { Direct as PODirect } from "./Direct"
import { Installment as POInstallment } from "./Installment"
import { Invoice as POInvoice } from "./Invoice"
import { Defer as PODefer } from "./Defer"

export type PaymentOption = POCard | PODirect | POInstallment | POInvoice
export namespace PaymentOption {
	export const is = Base.is
	export type Type = POType
	export type Card = POCard
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
	}
	export type Invoice = POInvoice
	export namespace Invoice {
		export const is = POInvoice.is
	}
	export type Defer = PODefer
	export namespace Defer {
		export const is = PODefer.is
	}
}
