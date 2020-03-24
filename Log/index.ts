import { Content as LogContent } from "./Content"
import { Entry as LogEntry } from "./Entry"
import { Level as LogLevel } from "./Level"
import { Reference as LogReference } from "./Reference"

export type Log = LogEntry[]

// tslint:disable: no-shadowed-variable
export namespace Log {
	export function is(value: Log | any): value is Log {
		return Array.isArray(value) &&
			value.every(LogEntry.is)
	}
	export type Content = LogContent
	export namespace Content {
		export const is = LogContent.is
	}
	export type Entry = LogEntry
	export namespace Entry {
		export const is = LogEntry.is
	}
	export type Level = LogLevel
	export namespace Level {
		export const is = LogLevel.is
	}
	export type Reference = LogReference
	export namespace Reference {
		export const is = LogReference.is
	}
}
