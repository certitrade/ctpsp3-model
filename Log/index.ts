import * as authly from "authly"
import * as servly from "servly"
import * as isoly from "isoly"
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

export namespace Log {
	export function is(value: Log | any): value is Log {
		return (
			typeof value == "object" &&
			authly.Identifier.is(value.id, 16) &&
			(value.merchant == undefined || authly.Identifier.is(value.merchant, 8)) &&
			(value.reference == undefined || LogReference.is(value.reference)) &&
			(value.client == undefined || authly.Identifier.is(value.client)) &&
			(value.system == undefined || LogSystem.is(value.system)) &&
			Array.isArray(value.entries) &&
			value.entries.every(servly.Log.Entry.is) &&
			servly.Log.is(value)
		)
	}
	export function isArray(value: Log[] | any): value is Log[] {
		return Array.isArray(value) && value.every(Log.is)
	}
	export function generateId(): authly.Identifier {
		return authly.Identifier.generate(16)
	}
	export function groupByNumber(log: Log[]): Log[][] {
		return Object.values(
			log.reduce<{ [number: string]: Log[] }>((result, current) => {
				const number = current.reference?.number ?? "unknown"
				const logs = result[number] ?? []
				logs.push(current)
				result[number] = logs
				return result
			}, {})
		)
	}
	export type Row = {
		id: authly.Identifier
		merchant?: authly.Identifier
		reference?: LogReference
		client?: authly.Identifier
		system?: LogSystem
		interval?: [isoly.DateTime, isoly.DateTime]
		level: servly.Log.Level[]
	}
	export function toRow(log: Log): Row
	export function toRow(log: Log[]): Row[]
	export function toRow(log: Log | Log[]): Row | Row[] {
		return Log.is(log)
			? log.entries.reduce<Row>(
					(r, e) => {
						if (!r.interval)
							r.interval = [e.created, e.created]
						else if (e.created < r.interval[0])
							r.interval[0] = e.created
						else if (e.created > r.interval[1])
							r.interval[1] = e.created
						if (!r.level.some(l => e.level))
							r.level.push(e.level)
						return r
					},
					{
						id: log.id,
						merchant: log.merchant,
						reference: log.reference,
						client: log.client,
						system: log.system,
						level: [],
					}
			  )
			: log.map(l => toRow(l))
	}
	function isRows(value: Row[] | any): value is Row[] {
		return Array.isArray(value) && value.every(r => typeof r == "object" && !Array.isArray(r))
	}
	export type Group = {
		id: authly.Identifier[]
		merchant?: authly.Identifier
		reference?: LogReference
		client?: authly.Identifier
		system: LogSystem[]
		interval?: [isoly.DateTime, isoly.DateTime]
		level: servly.Log.Level[]
	}
	export function toGroup(rows: Row[]): Group
	export function toGroup(rows: Row[][]): Group[]
	export function toGroup(rows: Row[] | Row[][]): Group | Group[] {
		return isRows(rows)
			? rows.reduce<Group>(
					(result, row) => {
						result.id.push(row.id)
						if (!result.merchant)
							result.merchant = row.merchant
						if (!result.reference)
							result.reference = row.reference
						if (!result.client)
							result.client = row.client
						if (row.system && !result.system.some(l => row.system))
							result.system.push(row.system)
						if (row.interval)
							if (!result.interval)
								result.interval = row.interval
							else if (row.interval[0] < result.interval[0])
								result.interval[0] = row.interval[0]
							else if (row.interval[0] > result.interval[1])
								result.interval[1] = row.interval[0]
						result.level = [...new Set(result.level.concat(row.level))]
						return result
					},
					{
						id: [],
						system: [],
						level: [],
					}
			  )
			: rows.map(l => toGroup(l))
	}
	export namespace Group {
		export function toCsv(group: Group): string
		export function toCsv(group: Group[]): string
		export function toCsv(group: Group | Group[]): string {
			return !Array.isArray(group)
				? [
						group.id.join(" "),
						group.merchant,
						group.reference?.id,
						group.reference?.number,
						group.reference?.type,
						group.client,
						group.system.join(" "),
						group.interval?.[0],
						group.interval?.[1],
						group.level.join(" "),
				  ]
						.map(g => `"${g ?? ""}"`)
						.join(",	")
				: '"id", "merchant", "reference id", "reference number", "reference type", "client", "system", "interval start", "interval end", "level"\n' +
						group.map(g => toCsv(g)).join("\n")
		}
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
