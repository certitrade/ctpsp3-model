import { Card } from "./Card"

export type Creatable = Card.Creatable | Card.Creatable.Token

export namespace Creatable {
	export function is(value: Creatable | any): value is Creatable {
		return Card.Creatable.is(value) || Card.Creatable.Token.is(value)
	}
}
