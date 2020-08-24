export abstract class Base {
	abstract readonly result: "failure" | "success"
	abstract readonly type: "unverified" | "verified" | "verification required" | "error"
}
