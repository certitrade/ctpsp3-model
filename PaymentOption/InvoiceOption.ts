import { DateTime } from "../DateTime"

export interface InvoiceOption {
	due: DateTime | number // date or number of days
	fee: number // invoice fee in selected currency
}
