import * as dotenv from "dotenv"
import * as gracely from "gracely"
import * as model from "."

dotenv.config()
model.Connection.baseUrl = process.env.backendUrl || ""

describe("Connection", () => {
	it("fails login", async () => {
		const wrongUser = "Petter"
		const wrongPassword = "qwerty"
		expect(await model.Connection.login(wrongUser, wrongPassword)).toMatchObject({ status: 401, type: "not authorized" })
	})
	it("logs in", async () => {
		expect(await model.Connection.login(process.env.backendUser || "", process.env.backendPassword || "")).toMatchObject({ email: process.env.backendUser })
	})
	it("reauthenticate", async () => {
		model.Connection.reauthenticate = async () => {
			const user = await model.Connection.login(process.env.backendUser || "", process.env.backendPassword || "")
			let result: gracely.Error | [model.User, model.Configuration]
			if (gracely.Error.is(user))
				result = user
			else {
				let merchant = user.merchant
				if (Array.isArray(merchant))
					merchant = merchant[0]
				result = [user, merchant.configuration.production || merchant.configuration.test as model.Configuration]
			}
			return result
		}
		const orders = await model.Connection.get<model.Order[]>("order")
		expect(Array.isArray(orders)).toBeTruthy()
	})
})
