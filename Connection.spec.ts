import * as dotenv from "dotenv"
import * as model from "."

dotenv.config()
model.Connection.baseUrl = process.env.backendUrl || ""

describe("Connection", () => {
	const user = "Petter"
	const wrongPassword = "qwerty"
	it("fails login", async () => {
		expect(await model.Connection.login(user, wrongPassword)).toMatchObject({ status: 404, type: "not found" })
	})
})
