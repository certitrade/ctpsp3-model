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
		let start = "2030-11-15T03:00:00.000Z"
		let schedule: model.Schedule = { frequency: "daily" }
		let first = model.Schedule.next(schedule, start)
		let second = model.Schedule.next(schedule, first)
		expect(first).toMatch("2030-11-16T")
		expect(second).toMatch("2030-11-17T")
		schedule = { frequency: "daily", divisor: 2 }
		first = model.Schedule.next(schedule, start)
		second = model.Schedule.next(schedule, first)
		expect(first).toMatch("2030-11-16T")
		expect(second).toMatch("2030-11-18T")
		schedule = { frequency: "daily", divisor: [2, 3] }
		first = model.Schedule.next(schedule, start)
		second = model.Schedule.next(schedule, first)
		expect(first).toMatch("2030-11-17T")
		expect(second).toMatch("2030-11-20T")
		start = "2030-11-29T03:00:00.000Z"
		first = model.Schedule.next(schedule, start)
		second = model.Schedule.next(schedule, first)
		expect(first).toMatch("2030-12-02T")
		expect(second).toMatch("2030-12-05T")
	})
	it("weekly", () => {
		const start = "2030-11-30T03:00:00.000Z"
		let schedule: model.Schedule = { frequency: "weekly" }
		const initial = model.Schedule.next(schedule)
		let first = model.Schedule.next(schedule, start)
		let second = model.Schedule.next(schedule, first)
		expect(initial).toMatch(isoly.DateTime.now().substring(0, 10))
		expect(first).toMatch("2030-12-07T")
		expect(second).toMatch("2030-12-14T")
		schedule = { frequency: "weekly", divisor: 2 }
		first = model.Schedule.next(schedule, start)
		second = model.Schedule.next(schedule, first)
		expect(first).toMatch("2030-12-14T")
		expect(second).toMatch("2030-12-28T")
		schedule = { frequency: "weekly", divisor: [2, 3] }
		first = model.Schedule.next(schedule, start)
		second = model.Schedule.next(schedule, first)
		expect(first).toMatch("2030-12-14T")
		expect(second).toMatch("2031-01-11T")
		schedule = { frequency: "weekly", offset: 1 }
		first = model.Schedule.next(schedule, start)
		second = model.Schedule.next(schedule, first)
		expect(first).toMatch("2030-12-02T")
		expect(second).toMatch("2030-12-09T")
		schedule = { frequency: "weekly", divisor: 2, offset: 2 }
		first = model.Schedule.next(schedule, start)
		second = model.Schedule.next(schedule, first)
		expect(first).toMatch("2030-12-10T")
		expect(second).toMatch("2030-12-24T")
		schedule = { frequency: "weekly", divisor: [2, 3], offset: 2 }
		first = model.Schedule.next(schedule, start)
		second = model.Schedule.next(schedule, first)
		expect(first).toMatch("2030-12-10T")
		expect(second).toMatch("2031-01-07T")
	})
	it("monthly", () => {
		const start = "2030-11-26T03:00:00.000Z"
		let schedule: model.Schedule = { frequency: "monthly" }
		const initial = model.Schedule.next(schedule)
		let first = model.Schedule.next(schedule, start)
		let second = model.Schedule.next(schedule, first)
		expect(initial).toMatch(isoly.DateTime.now().substring(0, 10))
		expect(first).toMatch("2030-12-26T")
		expect(second).toMatch("2031-01-26T")
		schedule = { frequency: "monthly", divisor: 7 }
		first = model.Schedule.next(schedule, start)
		second = model.Schedule.next(schedule, first)
		expect(first).toMatch("2031-07-26T")
		expect(second).toMatch("2032-07-26T")
		schedule = { frequency: "monthly", divisor: [2, 3] }
		first = model.Schedule.next(schedule, start)
		second = model.Schedule.next(schedule, first)
		expect(first).toMatch("2031-02-26T")
		expect(second).toMatch("2031-05-26T")
		schedule = { frequency: "monthly", offset: 0 }
		first = model.Schedule.next(schedule, start)
		second = model.Schedule.next(schedule, first)
		expect(first).toMatch("2030-12-01T")
		expect(second).toMatch("2031-01-01T")
		schedule = { frequency: "monthly", offset: -1 }
		first = model.Schedule.next(schedule, start)
		second = model.Schedule.next(schedule, first)
		expect(first).toMatch("2030-11-30T")
		expect(second).toMatch("2030-12-31T")
		schedule = { frequency: "monthly", divisor: 2, offset: 6 }
		first = model.Schedule.next(schedule, start)
		second = model.Schedule.next(schedule, first)
		expect(first).toMatch("2030-12-07T")
		expect(second).toMatch("2031-02-07T")
		schedule = { frequency: "monthly", divisor: [2, 3], offset: 1 }
		first = model.Schedule.next(schedule, start)
		second = model.Schedule.next(schedule, first)
		expect(first).toMatch("2031-02-02T")
		expect(second).toMatch("2031-05-02T")
		schedule = { frequency: "monthly", offset: 30 }
		first = model.Schedule.next(schedule, start)
		second = model.Schedule.next(schedule, first)
		expect(first).toMatch("2030-11-30T")
		expect(second).toMatch("2030-12-31T")
		schedule = { frequency: "monthly", offset: 1 }
		first = model.Schedule.next(schedule, start)
		second = model.Schedule.next(schedule, first)
		expect(first).toMatch("2030-12-02T")
		expect(second).toMatch("2031-01-02T")
	})
	it("yearly", () => {
		const start = "2030-11-30T03:00:00.000Z"
		let schedule: model.Schedule = { frequency: "yearly" }
		const initial = model.Schedule.next(schedule)
		let first = model.Schedule.next(schedule, start)
		let second = model.Schedule.next(schedule, first)
		expect(initial).toMatch(isoly.DateTime.now().substring(0, 10))
		expect(first).toMatch("2031-11-30T")
		expect(second).toMatch("2032-11-30T")
		schedule = { frequency: "yearly", divisor: 2 }
		first = model.Schedule.next(schedule, start)
		second = model.Schedule.next(schedule, first)
		expect(first).toMatch("2032-11-30T")
		expect(second).toMatch("2034-11-30T")
		schedule = { frequency: "yearly", divisor: [2, 3] }
		first = model.Schedule.next(schedule, start)
		second = model.Schedule.next(schedule, first)
		expect(first).toMatch("2033-11-30T")
		expect(second).toMatch("2036-11-30T")
		schedule = { frequency: "yearly", offset: 1 }
		first = model.Schedule.next(schedule, start)
		second = model.Schedule.next(schedule, first)
		expect(first).toMatch("2031-02-28T")
		expect(second).toMatch("2032-02-28T")
		schedule = { frequency: "yearly", divisor: 2, offset: 2 }
		first = model.Schedule.next(schedule, start)
		second = model.Schedule.next(schedule, first)
		expect(first).toMatch("2032-03-30T")
		expect(second).toMatch("2034-03-30T")
		schedule = { frequency: "yearly", divisor: [2, 3], offset: 2 }
		first = model.Schedule.next(schedule, start)
		second = model.Schedule.next(schedule, first)
		expect(first).toMatch("2033-03-30T")
		expect(second).toMatch("2036-03-30T")
		schedule = { frequency: "yearly", divisor: [2, 3], offset: [2, -1] }
		first = model.Schedule.next(schedule, start)
		second = model.Schedule.next(schedule, first)
		expect(first).toMatch("2033-03-31T")
		expect(second).toMatch("2036-03-31T")
	})
	it("quarterly", () => {
		const start = "2030-11-30T03:00:00.000Z"
		let schedule: model.Schedule = { frequency: "quarterly" }
		const initial = model.Schedule.next(schedule)
		let first = model.Schedule.next(schedule, start)
		let second = model.Schedule.next(schedule, first)
		expect(initial).toMatch(isoly.DateTime.now().substring(0, 10))
		expect(first).toMatch("2031-02-28T")
		expect(second).toMatch("2031-05-28T")
		schedule = { frequency: "quarterly", divisor: 2 }
		first = model.Schedule.next(schedule, start)
		second = model.Schedule.next(schedule, first)
		expect(first).toMatch("2031-05-30T")
		expect(second).toMatch("2031-11-30T")
		schedule = { frequency: "quarterly", divisor: [2, 3] }
		first = model.Schedule.next(schedule, start)
		second = model.Schedule.next(schedule, first)
		expect(first).toMatch("2031-05-30T")
		expect(second).toMatch("2032-02-29T")
		schedule = { frequency: "quarterly", offset: 1 }
		first = model.Schedule.next(schedule, start)
		second = model.Schedule.next(schedule, first)
		expect(first).toMatch("2031-02-28T")
		expect(second).toMatch("2031-05-28T")
		schedule = { frequency: "quarterly", divisor: 2, offset: 2 }
		first = model.Schedule.next(schedule, start)
		second = model.Schedule.next(schedule, first)
		expect(first).toMatch("2030-12-30T")
		expect(second).toMatch("2031-06-30T")
		schedule = { frequency: "quarterly", divisor: [2, 3], offset: 2 }
		first = model.Schedule.next(schedule, start)
		second = model.Schedule.next(schedule, first)
		expect(first).toMatch("2031-06-30T")
		expect(second).toMatch("2032-03-30T")
		schedule = { frequency: "quarterly", divisor: [2, 3], offset: [2, -1] }
		first = model.Schedule.next(schedule, start)
		second = model.Schedule.next(schedule, first)
		expect(first).toMatch("2031-06-30T")
		expect(second).toMatch("2032-03-30T")
	})
})
