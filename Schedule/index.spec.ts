import * as isoly from "isoly"
import * as model from "../index"

describe("Schedule", () => {
	it("is simple", () => {
		expect(model.Schedule.is({ frequency: "daily" })).toBeTruthy()
		expect(model.Schedule.is({ frequency: "weekly" })).toBeTruthy()
		expect(model.Schedule.is({ frequency: "quarterly" })).toBeTruthy()
		expect(model.Schedule.is({ frequency: "monthly" })).toBeTruthy()
		expect(model.Schedule.is({ frequency: "yearly" })).toBeTruthy()
	})
	it("is with divisor", () => {
		expect(model.Schedule.is({ frequency: "daily", divisor: 2 })).toBeTruthy()
		expect(model.Schedule.is({ frequency: "weekly", divisor: [2, 2] })).toBeFalsy()
		expect(model.Schedule.is({ frequency: "quarterly", divisor: [2, 3] })).toBeTruthy()
		expect(model.Schedule.is({ frequency: "monthly", divisor: [1, 1] })).toBeFalsy()
		expect(model.Schedule.is({ frequency: "yearly", divisor: 3 })).toBeTruthy()
	})
	it("is with divisor and offset", () => {
		expect(model.Schedule.is({ frequency: "weekly", divisor: [2, 2], offset: 6 })).toBeFalsy()
		expect(model.Schedule.is({ frequency: "quarterly", divisor: [2, 3], offset: 2 })).toBeTruthy()
		expect(model.Schedule.is({ frequency: "monthly", divisor: [1, 1], offset: 11 })).toBeFalsy()
		expect(model.Schedule.is({ frequency: "monthly", divisor: [-1, 2], offset: 11 })).toBeFalsy()
		expect(model.Schedule.is({ frequency: "yearly", divisor: 3, offset: 3 })).toBeTruthy()
	})
	it("daily", () => {
		let start = "2030-11-15"
		let schedule: model.Schedule = { frequency: "daily" }
		let first = model.Schedule.next(schedule, start)
		let second = model.Schedule.next(schedule, first)
		expect(first).toMatch("2030-11-16")
		expect(second).toMatch("2030-11-17")
		schedule = { frequency: "daily", divisor: 2 }
		first = model.Schedule.next(schedule, start)
		second = model.Schedule.next(schedule, first)
		expect(first).toMatch("2030-11-16")
		expect(second).toMatch("2030-11-18")
		schedule = { frequency: "daily", divisor: [2, 3] }
		first = model.Schedule.next(schedule, start)
		second = model.Schedule.next(schedule, first)
		expect(first).toMatch("2030-11-17")
		expect(second).toMatch("2030-11-20")
		start = "2030-11-29"
		first = model.Schedule.next(schedule, start)
		second = model.Schedule.next(schedule, first)
		expect(first).toMatch("2030-12-02")
		expect(second).toMatch("2030-12-05")
	})
	it("weekly", () => {
		const start = "2030-11-30"
		let schedule: model.Schedule = { frequency: "weekly" }
		const initial = model.Schedule.next(schedule)
		let first = model.Schedule.next(schedule, start)
		let second = model.Schedule.next(schedule, first)
		expect(initial).toMatch(isoly.Date.now())
		expect(first).toMatch("2030-12-07")
		expect(second).toMatch("2030-12-14")
		schedule = { frequency: "weekly", divisor: 2 }
		first = model.Schedule.next(schedule, start)
		second = model.Schedule.next(schedule, first)
		expect(first).toMatch("2030-12-14")
		expect(second).toMatch("2030-12-28")
		schedule = { frequency: "weekly", divisor: [2, 3] }
		first = model.Schedule.next(schedule, start)
		second = model.Schedule.next(schedule, first)
		expect(first).toMatch("2030-12-14")
		expect(second).toMatch("2031-01-11")
		schedule = { frequency: "weekly", offset: 1 }
		first = model.Schedule.next(schedule, start)
		second = model.Schedule.next(schedule, first)
		expect(first).toMatch("2030-12-02")
		expect(second).toMatch("2030-12-09")
		schedule = { frequency: "weekly", divisor: 2, offset: 2 }
		first = model.Schedule.next(schedule, start)
		second = model.Schedule.next(schedule, first)
		expect(first).toMatch("2030-12-10")
		expect(second).toMatch("2030-12-24")
		schedule = { frequency: "weekly", divisor: [2, 3], offset: 2 }
		first = model.Schedule.next(schedule, start)
		second = model.Schedule.next(schedule, first)
		expect(first).toMatch("2030-12-10")
		expect(second).toMatch("2031-01-07")
	})
	it("monthly", () => {
		const start = "2030-11-26"
		let schedule: model.Schedule = { frequency: "monthly" }
		const initial = model.Schedule.next(schedule)
		let first = model.Schedule.next(schedule, start)
		let second = model.Schedule.next(schedule, first)
		expect(initial).toMatch(isoly.Date.now())
		expect(first).toMatch("2030-12-26")
		expect(second).toMatch("2031-01-26")
		schedule = { frequency: "monthly", divisor: 7 }
		first = model.Schedule.next(schedule, start)
		second = model.Schedule.next(schedule, first)
		expect(first).toMatch("2031-07-26")
		expect(second).toMatch("2032-07-26")
		schedule = { frequency: "monthly", divisor: [2, 3] }
		first = model.Schedule.next(schedule, start)
		second = model.Schedule.next(schedule, first)
		expect(first).toMatch("2031-02-26")
		expect(second).toMatch("2031-05-26")
		schedule = { frequency: "monthly", offset: 0 }
		first = model.Schedule.next(schedule, start)
		second = model.Schedule.next(schedule, first)
		expect(first).toMatch("2030-12-01")
		expect(second).toMatch("2031-01-01")
		schedule = { frequency: "monthly", offset: -1 }
		first = model.Schedule.next(schedule, start)
		second = model.Schedule.next(schedule, first)
		expect(first).toMatch("2030-11-30")
		expect(second).toMatch("2030-12-31")
		schedule = { frequency: "monthly", divisor: 2, offset: 6 }
		first = model.Schedule.next(schedule, start)
		second = model.Schedule.next(schedule, first)
		expect(first).toMatch("2030-12-07")
		expect(second).toMatch("2031-02-07")
		schedule = { frequency: "monthly", divisor: [2, 3], offset: 1 }
		first = model.Schedule.next(schedule, start)
		second = model.Schedule.next(schedule, first)
		expect(first).toMatch("2031-02-02")
		expect(second).toMatch("2031-05-02")
		schedule = { frequency: "monthly", offset: 30 }
		first = model.Schedule.next(schedule, start)
		second = model.Schedule.next(schedule, first)
		expect(first).toMatch("2030-11-30")
		expect(second).toMatch("2030-12-31")
		schedule = { frequency: "monthly", offset: 1 }
		first = model.Schedule.next(schedule, start)
		second = model.Schedule.next(schedule, first)
		expect(first).toMatch("2030-12-02")
		expect(second).toMatch("2031-01-02")
	})
	it("yearly", () => {
		const start = "2030-11-30"
		let schedule: model.Schedule = { frequency: "yearly" }
		const initial = model.Schedule.next(schedule)
		let first = model.Schedule.next(schedule, start)
		let second = model.Schedule.next(schedule, first)
		expect(initial).toMatch(isoly.Date.now())
		expect(first).toMatch("2031-11-30")
		expect(second).toMatch("2032-11-30")
		schedule = { frequency: "yearly", divisor: 2 }
		first = model.Schedule.next(schedule, start)
		second = model.Schedule.next(schedule, first)
		expect(first).toMatch("2032-11-30")
		expect(second).toMatch("2034-11-30")
		schedule = { frequency: "yearly", divisor: [2, 3] }
		first = model.Schedule.next(schedule, start)
		second = model.Schedule.next(schedule, first)
		expect(first).toMatch("2033-11-30")
		expect(second).toMatch("2036-11-30")
		schedule = { frequency: "yearly", offset: 1 }
		first = model.Schedule.next(schedule, start)
		second = model.Schedule.next(schedule, first)
		expect(first).toMatch("2031-02-28")
		expect(second).toMatch("2032-02-28")
		schedule = { frequency: "yearly", divisor: 2, offset: 2 }
		first = model.Schedule.next(schedule, start)
		second = model.Schedule.next(schedule, first)
		expect(first).toMatch("2032-03-30")
		expect(second).toMatch("2034-03-30")
		schedule = { frequency: "yearly", divisor: [2, 3], offset: 2 }
		first = model.Schedule.next(schedule, start)
		second = model.Schedule.next(schedule, first)
		expect(first).toMatch("2033-03-30")
		expect(second).toMatch("2036-03-30")
		schedule = { frequency: "yearly", divisor: [2, 3], offset: [2, -1] }
		first = model.Schedule.next(schedule, start)
		second = model.Schedule.next(schedule, first)
		expect(first).toMatch("2033-03-31")
		expect(second).toMatch("2036-03-31")
	})
	it("quarterly", () => {
		const start = "2030-11-30"
		let schedule: model.Schedule = { frequency: "quarterly" }
		const initial = model.Schedule.next(schedule)
		let first = model.Schedule.next(schedule, start)
		let second = model.Schedule.next(schedule, first)
		expect(initial).toMatch(isoly.Date.now())
		expect(first).toMatch("2031-02-28")
		expect(second).toMatch("2031-05-28")
		schedule = { frequency: "quarterly", divisor: 2 }
		first = model.Schedule.next(schedule, start)
		second = model.Schedule.next(schedule, first)
		expect(first).toMatch("2031-05-30")
		expect(second).toMatch("2031-11-30")
		schedule = { frequency: "quarterly", divisor: [2, 3] }
		first = model.Schedule.next(schedule, start)
		second = model.Schedule.next(schedule, first)
		expect(first).toMatch("2031-05-30")
		expect(second).toMatch("2032-02-29")
		schedule = { frequency: "quarterly", offset: 1 }
		first = model.Schedule.next(schedule, start)
		second = model.Schedule.next(schedule, first)
		expect(first).toMatch("2031-02-28")
		expect(second).toMatch("2031-05-28")
		schedule = { frequency: "quarterly", divisor: 2, offset: 2 }
		first = model.Schedule.next(schedule, start)
		second = model.Schedule.next(schedule, first)
		expect(first).toMatch("2030-12-30")
		expect(second).toMatch("2031-06-30")
		schedule = { frequency: "quarterly", divisor: [2, 3], offset: 2 }
		first = model.Schedule.next(schedule, start)
		second = model.Schedule.next(schedule, first)
		expect(first).toMatch("2031-06-30")
		expect(second).toMatch("2032-03-30")
		schedule = { frequency: "quarterly", divisor: [2, 3], offset: [2, -1] }
		first = model.Schedule.next(schedule, start)
		second = model.Schedule.next(schedule, first)
		expect(first).toMatch("2031-06-30")
		expect(second).toMatch("2032-03-30")
	})
})
