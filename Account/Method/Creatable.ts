import * as authly from "authly"
import { verify as verifyToken } from "../../verify"
import { Card } from "./Card"

export type Creatable = Card.Creatable

export namespace Creatable {
	export function is(value: Creatable | any): value is Creatable {
		return Card.Creatable.is(value)
	}
	export async function verify(token: authly.Token): Promise<Card.Creatable | undefined> {
		const result = await verifyToken(token)
		return is(result) ? result : undefined
	}
}
