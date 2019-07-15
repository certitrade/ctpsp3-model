import * as dotenv from "dotenv"
import * as model from "."

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
})
