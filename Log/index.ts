import * as authly from "authly"
import * as servly from "servly"
import { Entry as LogEntry } from "./Entry"
import { Reference as LogReference } from "./Reference"
import { System as LogSystem } from "./System"

export interface Log extends servly.Log {
	id: authly.Identifier
	reference: LogReference
	client?: authly.Identifier
	system: LogSystem
	entries: LogEntry[]
}

// tslint:disable: no-shadowed-variable
export namespace Log {
	export function is(value: Log | any): value is Log {
		return typeof value == "object" &&
			authly.Identifier.is(value.id) &&
			LogReference.is(value.reference) &&
			(value.client == undefined || authly.Identifier.is(value.client)) &&
			LogSystem.is(value.system) &&
			Array.isArray(value.entries) && value.entries.every(LogEntry.is) &&
			servly.Log.is(value)
	}
	export type Content = servly.Content
	export namespace Content {
		export const is = servly.Content.is
		export const freeze = servly.Content.freeze
	}
	export type Entry = LogEntry
	export namespace Entry {
		export const is = LogEntry.is
		export const generateId = LogEntry.generateId
		export const create = LogEntry.create
		export type Creatable = LogEntry.Creatable
		export namespace Creatable {
			export const is = LogEntry.Creatable.is
		}
	}
	export type Level = servly.Log.Level
	export namespace Level {
		export const is = servly.Log.Level.is
	}
	export type Reference = LogReference
	export namespace Reference {
		export const is = LogReference.is
		export type Type = LogReference.Type
		export namespace Type {
			export const is = LogReference.Type.is
		}
	}
	export type System = LogSystem
	export namespace System {
		export const is = LogSystem.is
	}
}
