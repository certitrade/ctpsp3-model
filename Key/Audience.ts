export type Audience = "agent" | "private" | "customer" | "public"
export namespace Audience {
	export function is(value: Audience | any): value is Audience {
		return value == "agent" || value == "private" || value == "customer" || value == "public"
	}
}
