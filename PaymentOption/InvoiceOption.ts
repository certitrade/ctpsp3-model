import { DateTime } from "isoly"

export interface InvoiceOption {
	due: DateTime | number // date or number of days
	fee: number // invoice fee in selected currency
}
