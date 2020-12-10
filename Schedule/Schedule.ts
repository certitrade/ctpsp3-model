import { Frequency } from "../index"

export type Schedule =
	| {
			frequency: "daily"
			divisor?: number | [number, number]
	  }
	| {
			frequency: "weekly"
			divisor?: number | [number, number]
			offset?: Schedule.dayOfWeek
	  }
	| {
			frequency: "monthly"
			divisor?: number | [number, number]
			offset?: Schedule.dayOfMonth
	  }
	| {
			frequency: "quarterly"
			divisor?: number | [number, number]
			offset?: Schedule.monthOfQuarter | [Schedule.monthOfQuarter, Schedule.dayOfMonth]
	  }
	| {
			frequency: "yearly"
			divisor?: number | [number, number]
			offset?: Schedule.monthOfYear | [Schedule.monthOfYear, Schedule.dayOfMonth]
	  }
export namespace Schedule {
	export function is(value: any | Schedule): value is Schedule {
		return (
			typeof value == "object" &&
			((value.frequency == "daily" && (value.divisor == undefined || isDivisor(value.divisor))) ||
				(value.frequency == "weekly" &&
					(value.divisor == undefined || isDivisor(value.divisor)) &&
					(value.offset == undefined || Schedule.dayOfWeekTypes.some(v => value.offset == v))) ||
				(value.frequency == "monthly" &&
					(value.divisor == undefined || isDivisor(value.divisor)) &&
					(value.offset == undefined || Schedule.dayOfMonthTypes.some(v => value.offset == v))) ||
				(value.frequency == "quarterly" &&
					(value.divisor == undefined || isDivisor(value.divisor)) &&
					(value.offset == undefined ||
						Schedule.monthOfQuarterTypes.some(v => value.offset == v) ||
						(Array.isArray(value.offset) &&
							value.offset.length == 2 &&
							Schedule.monthOfQuarterTypes.some(v => value.offset[0] == v) &&
							Schedule.dayOfMonthTypes.some(v => value.offset[1] == v)))) ||
				(value.frequency == "yearly" &&
					(value.divisor == undefined || isDivisor(value.divisor)) &&
					(value.offset == undefined ||
						Schedule.monthOfYearTypes.some(v => value.offset == v) ||
						(Array.isArray(value.offset) &&
							value.offset.length == 2 &&
							Schedule.monthOfYearTypes.some(v => value.offset[0] == v) &&
							Schedule.dayOfMonthTypes.some(v => value.offset[1] == v)))))
		)
	}
	export function isDivisor(value: any | number | [number, number]): value is number | [number, number] {
		return (
			(typeof value == "number" && value > 0) ||
			(Array.isArray(value) &&
				value.length == 2 &&
				typeof value[0] == "number" &&
				typeof value[1] == "number" &&
				value[0] > 0 &&
				value[1] > value[0])
		)
	}
	export type dayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6
	export const dayOfWeekTypes = [0, 1, 2, 3, 4, 5, 6]
	export type dayOfMonth =
		| -3
		| -2
		| -1
		| 0
		| 1
		| 2
		| 3
		| 4
		| 5
		| 6
		| 7
		| 8
		| 9
		| 10
		| 11
		| 12
		| 13
		| 14
		| 15
		| 16
		| 17
		| 18
		| 19
		| 20
		| 21
		| 22
		| 23
		| 24
		| 25
		| 26
		| 27
		| 28
		| 29
		| 30
	export const dayOfMonthTypes = [
		-3,
		-2,
		-1,
		0,
		1,
		2,
		3,
		4,
		5,
		6,
		7,
		8,
		9,
		10,
		11,
		12,
		13,
		14,
		15,
		16,
		17,
		18,
		19,
		20,
		21,
		22,
		23,
		24,
		25,
		26,
		27,
		28,
		29,
		30,
	]
	export type monthOfQuarter = 0 | 1 | 2
	export const monthOfQuarterTypes = [0, 1, 2]
	export type monthOfYear = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11
	export const monthOfYearTypes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

	export function extractDivisor(divisor: string): number | [number, number] {
		let result: number | [number, number]
		const value = divisor.split(" / ")
		if (value.length == 1)
			result = Number(value[0])
		else if (value.length == 2 && Number(value[0]) < Number(value[1]) && Number(value[0]) > 0)
			result = [Number(value[0]), Number(value[1])]
		else if (Number(value[0]) == 0)
			result = Number(value[1])
		else
			result = 1
		return result
	}
	export function extractOffset(offset: string | [string, string], frequency: Frequency) {
		let result: number | undefined | [number, number]
		let day: number | undefined
		let month: number | undefined
		switch (frequency) {
			case "weekly":
				result = typeof offset == "string" ? weekdayToInteger[offset] : undefined
				break
			case "monthly":
				result = offset == "Date" || !offset ? 0 : Number(offset)
				break
			case "quarterly":
				day = typeof offset == "string" ? undefined : offset[1] == "Date" || !offset[1] ? 0 : Number(offset[1])
				month = typeof offset == "string" ? quarterlyToInteger[offset] : quarterlyToInteger[offset[0]]
				result = !month && month != 0 ? undefined : !day ? month : [month, day]
				break
			case "yearly":
				day = typeof offset == "string" ? undefined : offset[1] == "Date" || !offset[1] ? 0 : Number(offset[1])
				month = typeof offset == "string" ? monthToInteger[offset] : monthToInteger[offset[0]]
				result = !month && month != 0 ? undefined : !day ? month : [month, day]
				break
			default:
				break
		}
		return result
	}
	export const frequencies = ["daily", "weekly", "monthly", "quarterly", "yearly"]
	export const weekdays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
	export const quarterly = ["first", "second", "third"]
	export const months = [
		"january",
		"february",
		"march",
		"april",
		"may",
		"june",
		"july",
		"august",
		"september",
		"october",
		"november",
		"december",
	]
	export const weekdayToInteger: Record<string, undefined | number> = {
		day: undefined,
		sunday: 0,
		monday: 1,
		tuesday: 2,
		wednesday: 3,
		thursday: 4,
		friday: 5,
		saturday: 6,
	}
	export const quarterlyToInteger: Record<string, undefined | number> = {
		month: undefined,
		first: 0,
		second: 1,
		third: 2,
	}
	export const monthToInteger: Record<string, undefined | number> = {
		month: undefined,
		january: 0,
		february: 1,
		march: 2,
		april: 3,
		may: 4,
		june: 5,
		july: 6,
		august: 7,
		september: 8,
		october: 9,
		november: 10,
		december: 11,
	}
}
