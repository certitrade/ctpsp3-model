export interface General {
	address1: string
	address2: string
	address3: string
	countryCode: ""
}
export namespace General {
	export function is(value: any | General): value is General {
		return (
			typeof value == "object" &&
			typeof value.address1 == "string" &&
			typeof value.address2 == "string" &&
			typeof value.address3 == "string" &&
			value.countryCode == ""
		)
	}
	export function create(): General {
		return { address1: "", address2: "", address3: "", countryCode: "" }
	}
}
