import { Account } from "../Account"
import { Order } from "../index"

export type Status = "active" | "created" | "inactive" | "pending" | "suspended"

export namespace Status {
	export const types: Status[] = ["active", "created", "inactive", "pending", "suspended"]
	export function is(value: any | Status): value is Status {
		return typeof value == "string" && types.some(t => t == value)
	}
	export function getStatus(account: Account, order?: Order): Status {
		// TODO: Add cases for order status being suspended and account being deactivated
		let status: Status
		if (!account.method[0] && !order)
			status = "created"
		else if (order?.status == "pending")
			status = "pending"
		else
			status = "active"
		return status
	}
}
