import { Card } from "./Card"

export type Creatable = Card.Creatable

export namespace Creatable {
	export function is(value: Creatable | any): value is Creatable {
		return Card.Creatable.is(value)
	}
}
