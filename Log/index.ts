import * as authly from "authly"
import { fetch } from "../fetch"
import { Content as LogContent } from "./Content"
import { Entry as LogEntry } from "./Entry"
import { Level as LogLevel } from "./Level"
import { Merchant } from "../Merchant"
import { Reference as LogReference } from "./Reference"
import { System as LogSystem } from "./System"

export type Log = LogEntry[]

// tslint:disable: no-shadowed-variable
export namespace Log {
	export function is(value: Log | any): value is Log {
		return Array.isArray(value) &&
			value.every(LogEntry.is)
	}
	export async function send(merchant: Merchant.Key | authly.Token | undefined, entry: LogEntry.Creatable): Promise<number>
	export async function send(merchant: Merchant.Key | authly.Token | undefined, system: LogSystem, reference: LogReference, point: string, step: string, level: LogLevel, content: LogContent): Promise<number>
	export async function send(merchant: Merchant.Key | authly.Token | undefined, system: LogEntry.Creatable | LogSystem, reference?: LogReference, point?: string, step?: string, level?: LogLevel, content?: LogContent): Promise<number> {
		const entry = LogSystem.is(system) ? { system, reference, point, step, level, content } : system
		if (authly.Token.is(merchant))
			merchant = await Merchant.Key.unpack(merchant)
		return !merchant ? 0 : (await fetch(merchant.iss + "/log", { method: "POST", body: JSON.stringify(entry) })).status
	}
	export type Content = LogContent
	export namespace Content {
		export const is = LogContent.is
		export const freeze = LogContent.freeze
	}
	export type Entry = LogEntry
	export namespace Entry {
		export const is = LogEntry.is
		export const create = LogEntry.create
		export type Creatable = LogEntry.Creatable
		export namespace Creatable {
			export const is = LogEntry.Creatable.is
		}
	}
	export type Level = LogLevel
	export namespace Level {
		export const is = LogLevel.is
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
