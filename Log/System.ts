export type System =
	| "payfunc/model"
	| "payfunc/backend"
	| "payfunc/checkout"
	| "payfunc/onboard"
	| "payfunc/portal"
	| "cardfunc/model"
	| "cardfunc/backend"
	| "cardfunc/web-app"
	| "cardfunc/element"

export namespace System {
	export function is(value: System | any): value is System {
		return (
			typeof value == "string" &&
			(value == "payfunc/model" ||
				value == "payfunc/backend" ||
				value == "payfunc/checkout" ||
				value == "payfunc/onboard" ||
				value == "payfunc/portal" ||
				value == "cardfunc/model" ||
				value == "cardfunc/backend" ||
				value == "cardfunc/web-app" ||
				value == "cardfunc/element")
		)
	}
}
