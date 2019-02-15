export interface PhoneNumbers {
	primary?: string
	cellphone?: string
	landline?: string
}
// tslint:disable-next-line: no-namespace
export namespace PhoneNumbers {
	export function is(value: PhoneNumbers | any): value is PhoneNumbers {
		return (typeof(value.primary) == typeof("string") || value.primary == undefined) &&
			(typeof(value.cellphone) == typeof("string") || value.cellphone == undefined) &&
			(typeof(value.landline) == typeof("string") || value.landline == undefined)
	}
}
