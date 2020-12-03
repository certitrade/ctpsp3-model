import { Schedule as Type } from "./Schedule"
import { next as nextDate } from "./next"

export type Schedule = Type
export namespace Schedule {
	export const is = Type.is
	export const next = nextDate
}
