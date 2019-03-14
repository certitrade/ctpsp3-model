export interface EmailAddresses {
	primary?: string
	billing?: string
}
export namespace EmailAddresses {
	export function is(value: EmailAddresses | any): value is EmailAddresses {
		return (typeof(value.primary) == typeof("string") || value.primary == undefined) &&
			(typeof(value.billing) == typeof("string") || value.billing == undefined)
	}
}
