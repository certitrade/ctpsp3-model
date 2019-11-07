import * as model from "../../index"

describe("Payment.Defer", () => {
	it("is", () => expect(model.Payment.Defer.is({
		type: "defer",
		method: "sms",
		contact: "+46700000000",
		items: 159,
		client: "CGaDLvmqkExR",
		number: "LU7JRgnp37mm",
		currency: "SEK",
		created: "2019-10-08T08:09:13.452Z",
		status: "created",
		service: "PayFunc",
		amount: 159,
		key: "aaaaaaaaaaaaaaa.bbbbbbbbbbbbb.cccccccccccc",
		merchant: "test",
		id: "gTNmTSkm9OShLhx1" })).toBeTruthy())
})
