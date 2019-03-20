export type CountryCode =
	"FI" |
	"SE"

export namespace CountryCode {
	export const toName = {
		SE: { en: "Sweden", local: "Sverige" },
		FI: { en: "Finland", local: "Soumi" },
	}
}
