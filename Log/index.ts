import { Entry as LogEntry } from "./Entry"
import { Reference as LogReference } from "./Reference"
import { Content as LogContent } from "./Content"

export type Log = LogEntry[]

// tslint:disable: no-shadowed-variable
export namespace Log {
	export function is(value: Log | any): value is Log {
		return Array.isArray(value) &&
			value.every(LogEntry.is)
	}
	export type Entry = LogEntry
	export namespace Entry {
		export const is = LogEntry.is
	}
	export type Reference = LogReference
	export namespace Reference {
		export const is = LogReference.is
	}
	export type Content = LogContent
	export namespace Content {
		export const is = LogContent.is
	}
}
