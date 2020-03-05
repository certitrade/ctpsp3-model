import { User } from "./"

describe("User.Creatable", () => {
	it("user with id", async () => {
		const value: any = {
			id: "abcd",
			email: "a string",
			merchant: {
				id: "abcd",
				name: "merchant",
				key: {
					private: "aaa.bbb.ccc",
				},
			},
			option: {
				"byBoat": "no",
				"byPlane": {
					"maybe": ["yes", "no"]
				},
			},
		}
		expect(User.Creatable.flaw(value)).toEqual({"flaws": [], "type": "model.User.Creatable"})
	})
	it("user without id", async () => {
		const value: any = {
			email: "a string",
			merchant: {
				id: "abcd",
				name: "merchant",
				key: {
					private: "aaa.bbb.ccc",
				},
			},
			option: {
				"byBoat": "no",
				"byPlane": {
					"maybe": ["yes", "no"]
				},
			},
		}
		expect(User.Creatable.flaw(value)).toEqual({"flaws": [], "type": "model.User.Creatable"})
	})
})
