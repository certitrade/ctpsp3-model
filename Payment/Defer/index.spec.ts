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
		theme: "dark",
		created: "2019-10-08T08:09:13.452Z",
		status: "created",
		service: "PayFunc",
		amount: 159,
		key:
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjcwNzEiLCJpYXQiOjE1NzAxMTEzNzkwMjAsImF1ZCI6WyJwcml2YXRlIiwicHVibGljIl0sInN1YiI6InRlc3QiLCJuYW1lIjoiTWFzaCBQYXkgVGVzdCIsIm9wdGlvbiI6eyJtYXNoIjoidGZvUnJ6SHlMSFFIbjZHbjQ1ZkdvUE5TRkJHdFJ0ZEV4LXpsUFNOY1ROSTBFMnNpaERZYmxjUkc2eXZtS3pHa2N2N2V0VnVnRm1RZnpDb2JDSDhwYW5raU9pSTJZbVI2WTJKT1RuSldSbmxFWjNsTVFqSkxhMUYxT1VVaUxDSnRaWEpqYUdGdWRDSTZOU3dpYjI1c2VTSTZleUowZVhCbElqb2lhVzUyYjJsalpTSXNJblJsY20xeklqcDdJbVIxWlNJNk16QXNJbVpsWlNJNk1IMTlmUSIsInNtcyI6InFBQk1KTGdTM21ncVI5S19JTkVSLUo3dGItNWdvMmpwejFRUGpCNVhIUTF0SEgzdFRTekZkeS1kZUVyWFhKZWszTlV3eEVsZndIdWctcEZ0Snl4eTZVMVVaM2RPUlVWNVRYcHNRMDU2V1ROTmVsRXlUVVJaZDAxRVNUVk5hbXhDSWl3aWMyVnVaR1Z5SWpvaVRXRnphQ0JRWVhrZ1ZHVnpkQ0o5In0sImV4cCI6MTU3MDU2MDQ3ODY5NywidXNlciI6Im9ubHlAdGVzdC5jb20ifQ.posPm8nHPC9pGbn17D8YgYIQxGUf7k8ho18Sl1QPjHY",
		merchant: "test",
		id: "gTNmTSkm9OShLhx1" })).toBeTruthy())
})
