import * as model from "../index"

describe("Schedule.toString", () => {
	it("scheduleToString", () => {
		let schedule: model.Frequency | model.Schedule = "daily"
		expect(model.Schedule.toString(schedule)).toEqual("daily")
		schedule = { frequency: "daily" }
		expect(model.Schedule.toString(schedule)).toEqual("daily")
		schedule = { frequency: "daily", divisor: 2 }
		expect(model.Schedule.toString(schedule)).toEqual("every even day")
		schedule = { frequency: "daily", divisor: [0, 2] }
		expect(model.Schedule.toString(schedule)).toEqual("every even day")
		schedule = { frequency: "daily", divisor: [1, 2] }
		expect(model.Schedule.toString(schedule)).toEqual("every odd day")
		schedule = { frequency: "monthly", divisor: [1, 2], offset: 3 }
		expect(model.Schedule.toString(schedule)).toEqual("every odd month on the 4th day")
		schedule = { frequency: "monthly", divisor: [2, 3], offset: 3 }
		expect(model.Schedule.toString(schedule)).toEqual("every 3rd month on the 4th day starting from the 3rd month")
		schedule = { frequency: "quarterly", divisor: [1, 2], offset: 2 }
		expect(model.Schedule.toString(schedule)).toEqual("on the 3rd month of every odd quarter")
		schedule = { frequency: "quarterly", divisor: [2, 3], offset: 2 }
		expect(model.Schedule.toString(schedule)).toEqual(
			"on the 3rd month of every 3rd quarter starting from the 3rd quarter"
		)
		schedule = { frequency: "quarterly", divisor: [1, 2], offset: [2, 25] }
		expect(model.Schedule.toString(schedule)).toEqual("on the 3rd month on the 26th day of every odd quarter")
		schedule = { frequency: "quarterly", divisor: 6, offset: [2, 30] }
		expect(model.Schedule.toString(schedule)).toEqual("on the 3rd month on the 31st day of every 6th quarter")
		schedule = { frequency: "quarterly", divisor: 1, offset: [0, 0] }
		expect(model.Schedule.toString(schedule)).toEqual("on the 1st month on the 1st day of every quarter")
		schedule = { frequency: "yearly", divisor: 5, offset: [11, 0] }
		expect(model.Schedule.toString(schedule)).toEqual("on the 12th month on the 1st day of every 5th year")
		schedule = { frequency: "yearly", divisor: [1, 5], offset: [10, -3] }
		expect(model.Schedule.toString(schedule)).toEqual(
			"on the 11th month on the 3rd to last day of every 5th year starting from the 2nd year"
		)
	})
	it("scheduleToString short", () => {
		let schedule: model.Frequency | model.Schedule = "daily"
		expect(model.Schedule.toString(schedule, true)).toEqual("daily")
		schedule = { frequency: "daily" }
		expect(model.Schedule.toString(schedule, true)).toEqual("daily")
		schedule = { frequency: "daily", divisor: 2 }
		expect(model.Schedule.toString(schedule, true)).toEqual("even days")
		schedule = { frequency: "daily", divisor: [0, 2] }
		expect(model.Schedule.toString(schedule, true)).toEqual("even days")
		schedule = { frequency: "daily", divisor: [1, 2] }
		expect(model.Schedule.toString(schedule, true)).toEqual("odd days")
		schedule = { frequency: "monthly", divisor: [1, 2], offset: 3 }
		expect(model.Schedule.toString(schedule, true)).toEqual("4th odd months")
		schedule = { frequency: "monthly", divisor: [2, 3], offset: 3 }
		expect(model.Schedule.toString(schedule, true)).toEqual("4th every 3rd month")
		schedule = { frequency: "quarterly", divisor: [1, 2], offset: 2 }
		expect(model.Schedule.toString(schedule, true)).toEqual("odd quarters 3rd month")
		schedule = { frequency: "quarterly", divisor: [2, 3], offset: 2 }
		expect(model.Schedule.toString(schedule, true)).toEqual("3rd quarter 3rd month")
		schedule = { frequency: "quarterly", divisor: [1, 2], offset: [2, 25] }
		expect(model.Schedule.toString(schedule, true)).toEqual("odd quarters 3rd month 26th day")
		schedule = { frequency: "quarterly", divisor: 6, offset: [2, 30] }
		expect(model.Schedule.toString(schedule, true)).toEqual("6th quarter 3rd month 31st day")
		schedule = { frequency: "quarterly", divisor: 1, offset: [0, 0] }
		expect(model.Schedule.toString(schedule, true)).toEqual("every quarter 1st month 1st day")
		schedule = { frequency: "yearly", divisor: 5, offset: [11, 0] }
		expect(model.Schedule.toString(schedule, true)).toEqual("every 5th year 12th month 1st day")
		schedule = { frequency: "yearly", divisor: [1, 5], offset: [10, -3] }
		expect(model.Schedule.toString(schedule, true)).toEqual("every 5th year 11th month 3rd to last day")
	})
})
