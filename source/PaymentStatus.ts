export type PaymentStatus = "created" | "pending" | "waiting for approval" | "ready for capture" | "captured" | "cancelled" | "failed"
// tslint:disable-next-line: no-namespace
export namespace PaymentStatus {
	export function is(value: PaymentStatus | any): value is PaymentStatus {
		return value == "created" || value == "pending" || value == "waiting for approval" || value == "ready for capture" || value == "captured" || value == "cancelled" || value == "failed"
	}
}
