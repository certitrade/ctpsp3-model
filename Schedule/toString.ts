import { Frequency } from "../Frequency"
import { Schedule } from "./Schedule"

export function toString(schedule: Frequency | Schedule, short?: boolean): string {
	let result: string
	if (Frequency.is(schedule))
		result = schedule
	else {
		switch (schedule.frequency) {
			case "daily":
				result = !schedule.divisor
					? schedule.frequency
					: divisorToString(schedule.divisor, undefined, undefined, "day", short)
				break
			case "weekly":
				const prefixWeek =
					schedule.offset != undefined
						? Object.entries(Schedule.weekdayToInteger).reduce((r, c) => (c[1] == schedule.offset ? c[0] : r), "")
						: undefined
				result = !schedule.divisor
					? schedule.frequency
					: divisorToString(schedule.divisor, prefixWeek, undefined, "week", short)
				break
			case "monthly":
				const prefixMonth = short ? offsetToString(undefined, schedule.offset, undefined, undefined) : undefined
				const suffixMonth = short ? undefined : offsetToString("on the", schedule.offset, "day", undefined)
				result = !schedule.divisor
					? schedule.frequency
					: divisorToString(schedule.divisor, prefixMonth, suffixMonth, "month", short)
				break
			case "quarterly":
			case "yearly":
				result = yearQuarterToString(schedule, short)
				break
			default:
				result = "undefined"
				break
		}
	}
	return result
}

function yearQuarterToString(
	schedule: Schedule & { frequency: "yearly" | "quarterly" },
	short: boolean | undefined
): string {
	const dayOffset = typeof schedule.offset == "number" ? undefined : schedule.offset ? schedule.offset[1] : undefined
	const monthOffset =
		typeof schedule.offset == "number" ? schedule.offset : schedule.offset ? schedule.offset[0] : undefined
	const dayOffsetPrefix = short ? undefined : offsetToString("on the", dayOffset, "day", "of")
	const dayOffsetSuffix = short ? offsetToString(undefined, dayOffset, "day", undefined) : undefined
	const monthOffsetPrefix = short
		? undefined
		: offsetToString("on the", monthOffset, "month", !dayOffsetPrefix ? "of" : undefined)
	const monthOffsetSuffix = short ? offsetToString(undefined, monthOffset, "month", undefined) : undefined
	return !schedule.divisor
		? schedule.frequency
		: divisorToString(
				schedule.divisor,
				monthOffsetPrefix && dayOffsetPrefix
					? monthOffsetPrefix + " " + dayOffsetPrefix
					: monthOffsetPrefix
					? monthOffsetPrefix
					: dayOffsetPrefix
					? dayOffsetPrefix
					: undefined,
				monthOffsetSuffix && dayOffsetSuffix
					? monthOffsetSuffix + " " + dayOffsetSuffix
					: monthOffsetSuffix
					? monthOffsetSuffix
					: dayOffsetSuffix
					? dayOffsetSuffix
					: undefined,
				schedule.frequency == "yearly" ? "year" : schedule.frequency == "quarterly" ? "quarter" : undefined,
				short
		  )
}

function offsetToString(
	prefix: string | undefined,
	offset: number | undefined,
	frequencyWord: string | undefined,
	suffix: string | undefined
): string | undefined {
	return offset == undefined
		? undefined
		: (prefix ? prefix + " " : "") +
				ordinal(offset) +
				(frequencyWord ? " " + frequencyWord : "") +
				(suffix ? " " + suffix : "")
}

function divisorToString(
	divisor: number | [number, number],
	prefix: string | undefined,
	suffix: string | undefined,
	frequencyWord: string | undefined,
	short: boolean | undefined
): string {
	const divisorNumber = typeof divisor == "number" ? divisor : divisor[1]
	let result =
		!prefix &&
		(!short || divisorNumber == 1 || (frequencyWord != "quarter" && frequencyWord != "month" && divisorNumber != 2))
			? "every "
			: ""
	result += prefix != undefined && prefix.length > 0 ? prefix + (!short || divisorNumber != 2 ? " every " : " ") : ""
	result += ordinal(divisorNumber - 1, true, divisor)
	result += frequencyWord
		? (!result.endsWith(" ") ? " " : "") + frequencyWord + (!short || divisorNumber != 2 ? "" : "s")
		: ""
	result += suffix ? (!result.endsWith(" ") ? " " : "") + suffix : ""
	if (!short && Array.isArray(divisor) && divisor[1] > 2)
		result += " starting from the " + ordinal(divisor[0], false, divisor) + (frequencyWord ? " " + frequencyWord : "")
	return result
}

function ordinal(index: number, wordy = false, divisor?: number | [number, number]): string {
	let result: string | undefined
	index = Math.floor(index)
	if (index == -1)
		result = "last"
	else if (index < 0)
		result = positiveOrdinal(index) + " to last"
	else if (wordy && index == 0)
		result = ""
	else if (wordy && index == 1)
		result = !divisor
			? "other"
			: divisor == 2 || (Array.isArray(divisor) && divisor[1] == 2 && divisor[0] == 0)
			? "even"
			: Array.isArray(divisor) && divisor[1] == 2 && divisor[0] == 1
			? "odd"
			: "other"
	else
		result = positiveOrdinal(index + 1)
	return result
}

function positiveOrdinal(index: number): string {
	let result: string
	index = Math.abs(Math.floor(index))
	if (index.toString().match(/(^1|[^1]1)$/))
		result = index + "st"
	else if (index.toString().match(/(^2|[^1]2)$/))
		result = index + "nd"
	else if (index.toString().match(/(^3|[^1]3)$/))
		result = index + "rd"
	else
		result = index + "th"
	return result
}
