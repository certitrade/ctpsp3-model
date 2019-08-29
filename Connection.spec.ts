import * as dotenv from "dotenv"
import * as gracely from "gracely"
import * as authly from "authly"
import * as model from "./index"

dotenv.config()
model.Connection.baseUrl = process.env.backendUrl || ""

describe.skip("Connection", () => {
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
			let result: gracely.Error | [model.User, authly.Token]
			if (gracely.Error.is(user))
				result = user
			else {
				let merchant = user.merchant
				if (Array.isArray(merchant))
					merchant = merchant[0]
				result = [user, merchant.key.private]
			}
			return result
		}
		const orders = await model.Connection.get<model.Order[]>("order")
		expect(Array.isArray(orders)).toBeTruthy()
	})
})
