import { Type as MessageType } from "./Type"
import { Order } from "../Order"
import { Key } from "../Key"
export interface Message {
	type: MessageType
	order: Order
	merchant: Pick<Key, "name" | "language" | "logotype" | "id" | "url" | "terms">
}
