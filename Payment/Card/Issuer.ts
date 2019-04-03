export type Issuer =
	"amex" |
	"dankort" |
	"diners" |
	"discover" |
	"electron" |
	"interpayment" |
	"jcb" |
	"maestro" |
	"mastercard" |
	"unionpay" |
	"visa"

export namespace Issuer {
	export function is(value: any | Issuer): value is Issuer {
		return typeof(value) == "string" && (
			value == "amex" ||
			value == "dankort" ||
			value == "diners" ||
			value == "discover" ||
			value == "electron" ||
			value == "interpayment" ||
			value == "jcb" ||
			value == "maestro" ||
			value == "mastercard" ||
			value == "unionpay" ||
			value == "visa"
		)
	}
}
