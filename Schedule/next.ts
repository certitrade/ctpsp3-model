import * as isoly from "isoly"
import { Frequency } from "../Frequency"
import { Schedule } from "./Schedule"

export function next(schedule: Frequency | Schedule, previous?: isoly.Date): isoly.Date {
	let result: isoly.Date | undefined = previous
	let difference: number
	let offset: number
	let modulo: number
	const raw = previous ? isoly.Date.parse(previous) : new Date()
	let daysOfMonth = daysPerMonth(raw)
	if (Frequency.is(schedule))
		schedule = { frequency: schedule } as Schedule
	const divisor: [number, number] = Array.isArray(schedule.divisor) ? schedule.divisor : [0, schedule.divisor ?? 1]
	switch (schedule.frequency) {
		case "daily":
			modulo = (divisor[0] - (raw.getDate() % divisor[1]) + divisor[1]) % divisor[1]
			difference = modulo == 0 ? (previous ? divisor[1] : 0) : modulo
			offset = raw.getDate() + difference
			raw.setDate(offset < daysOfMonth ? offset : daysOfMonth + (divisor[0] ? divisor[0] : divisor[1]))
			result = isoly.Date.create(raw)
			break
		case "weekly":
			offset = schedule.offset == undefined ? 0 : (schedule.offset + 7 - raw.getDay()) % 7
			raw.setDate(raw.getDate() + offset)
			modulo = (divisor[0] - (getWeek(raw) % divisor[1]) + divisor[1]) % divisor[1]
			difference = modulo == 0 && offset == 0 ? (previous ? divisor[1] : 0) : modulo
			raw.setDate(raw.getDate() + difference * 7)
			raw.setDate(raw.getDate() + 7 * ((divisor[0] - (getWeek(raw) % divisor[1]) + divisor[1]) % divisor[1]))
			result = isoly.Date.create(raw)
			break
		case "monthly":
			offset = schedule.offset == undefined ? raw.getDate() : schedule.offset + 1
			const thisMonth =
				raw.getDate() > (offset > 0 ? offset : daysPerMonth(raw) - offset) ||
				(previous &&
					raw.getDate() ==
						(offset > 0 ? (offset > daysPerMonth(raw) ? daysPerMonth(raw) : offset) : daysPerMonth(raw) - offset))
					? 1
					: 0
			raw.setDate(1)
			raw.setMonth(raw.getMonth() + thisMonth)
			// This is not an error. Do this twice to remove edge cases with wrapping year.
			raw.setMonth(raw.getMonth() + ((divisor[0] - ((raw.getMonth() + 1) % divisor[1]) + divisor[1]) % divisor[1]))
			raw.setMonth(raw.getMonth() + ((divisor[0] - ((raw.getMonth() + 1) % divisor[1]) + divisor[1]) % divisor[1]))
			daysOfMonth = daysPerMonth(raw)
			offset = offset > 0 ? (offset >= daysOfMonth ? daysOfMonth : offset) : daysOfMonth + offset
			raw.setDate(offset)
			result = isoly.Date.create(raw)
			break
		case "quarterly":
			offset = Array.isArray(schedule.offset) ? schedule.offset[1] + 1 : raw.getDate()
			const monthInQuarter = raw.getMonth() % 3
			const quarterOffset =
				schedule.offset != undefined
					? Array.isArray(schedule.offset)
						? monthInQuarter == schedule.offset[0]
							? raw.getDate() > (offset > 0 ? offset : daysPerMonth(raw) + offset)
								? 3
								: 0
							: (3 - monthInQuarter + schedule.offset[0]) % 3
						: (3 - monthInQuarter + schedule.offset) % 3
					: 0
			raw.setDate(1)
			//Repeating this has to be done to get rid of errors while wrapping years
			raw.setMonth(raw.getMonth() + quarterOffset)
			modulo = (divisor[0] - ((1 + Math.floor(raw.getMonth() / 3)) % divisor[1]) + divisor[1]) % divisor[1]
			raw.setMonth(raw.getMonth() + modulo * 3)
			modulo = (divisor[0] - ((1 + Math.floor(raw.getMonth() / 3)) % divisor[1]) + divisor[1]) % divisor[1]
			raw.setMonth(raw.getMonth() + modulo * 3)
			offset = offset > 0 ? (offset >= daysPerMonth(raw) ? daysPerMonth(raw) : offset) : daysPerMonth(raw) + offset
			raw.setDate(offset)
			if (previous && isoly.Date.create(raw).substring(0, 10) == previous.substring(0, 10)) {
				raw.setDate(1)
				raw.setMonth(raw.getMonth() + divisor[1] * 3)
				offset = offset > 0 ? (offset >= daysPerMonth(raw) ? daysPerMonth(raw) : offset) : daysPerMonth(raw) + offset
				raw.setDate(offset)
			}
			result = isoly.Date.create(raw)
			break

		case "yearly":
			const day = Array.isArray(schedule.offset) ? schedule.offset[1] + 1 : raw.getDate()
			const month = Array.isArray(schedule.offset) ? schedule.offset[0] : schedule.offset ?? raw.getMonth()
			raw.setFullYear(raw.getFullYear(), month, 1)
			offset = day > 0 ? (day >= daysPerMonth(raw) ? daysPerMonth(raw) : day) : daysPerMonth(raw) + day
			raw.setDate(offset)
			const today = isoly.Date.now().substring(0, 10)
			const help = isoly.Date.create(raw).substring(0, 10)
			raw.setDate(1)
			if (today > help || (previous && help <= previous.substring(0, 10)))
				raw.setFullYear(raw.getFullYear() + 1)
			modulo = (divisor[0] - (raw.getFullYear() % divisor[1]) + divisor[1]) % divisor[1]
			raw.setFullYear(raw.getFullYear() + modulo, month)
			offset = day > 0 ? (day >= daysPerMonth(raw) ? daysPerMonth(raw) : day) : daysPerMonth(raw) + day
			raw.setDate(offset)
			result = isoly.Date.create(raw)
			break

		default:
			break
	}
	return result ?? isoly.Date.now()
}

function daysPerMonth(raw: Date, offset?: number) {
	let daysOfPreviousMonth
	if (offset) {
		while (offset < 0)
			offset += 12
		while (offset > 11)
			offset -= 12
	} else
		offset = 0
	switch (raw.getMonth() - offset) {
		case 0:
		case 2:
		case 4:
		case 6:
		case 7:
		case 9:
		case 11:
		default:
			daysOfPreviousMonth = 31
			break
		case 3:
		case 5:
		case 8:
		case 10:
			daysOfPreviousMonth = 30
			break
		case 1:
			daysOfPreviousMonth = raw.getFullYear() % 4 == 0 ? 29 : 28
			break
	}
	return daysOfPreviousMonth
}

function getWeek(date: Date) {
	date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
	date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7))
	return Math.ceil(((date.getTime() - Date.UTC(date.getUTCFullYear(), 0, 1)) / 86400000 + 1) / 7)
}
