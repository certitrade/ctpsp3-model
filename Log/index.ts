import * as authly from "authly"
import * as servly from "servly"
import { Reference as LogReference } from "./Reference"
import { System as LogSystem } from "./System"

export interface Log extends servly.Log {
	id: authly.Identifier
	merchant?: authly.Identifier
	reference?: LogReference
	client?: authly.Identifier
	system?: LogSystem
	entries: servly.Log.Entry[]
}

// tslint:disable: no-shadowed-variable
export namespace Log {
	export function is(value: Log | any): value is Log {
		return typeof value == "object" &&
			authly.Identifier.is(value.id, 16) &&
			(value.merchant == undefined || authly.Identifier.is(value.merchant, 8)) &&
			(value.reference == undefined || LogReference.is(value.reference)) &&
			(value.client == undefined || authly.Identifier.is(value.client)) &&
			(value.system == undefined || LogSystem.is(value.system)) &&
			Array.isArray(value.entries) && value.entries.every(servly.Log.Entry.is) &&
			servly.Log.is(value)
	}
	export function generateId(): authly.Identifier {
		return authly.Identifier.generate(16)
	}
	export type Content = servly.Content
	export namespace Content {
		export const is = servly.Content.is
		export const freeze = servly.Content.freeze
	}
	export type Entry = servly.Log.Entry
	export namespace Entry {
		export const is = servly.Log.Entry.is
		export function generateId(): authly.Identifier {
			return authly.Identifier.generate(16)
		}
		export type Creatable = servly.Log.Entry.Creatable
		export namespace Creatable {
			export const is = servly.Log.Entry.Creatable.is
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
