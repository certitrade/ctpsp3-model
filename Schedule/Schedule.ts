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
}
