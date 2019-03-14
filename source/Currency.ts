export type Currency =
	"AED" |
	"AFN" |
	"ALL" |
	"AMD" |
	"ANG" |
	"AOA" |
	"ARS" |
	"AUD" |
	"AWG" |
	"AZN" |
	"BAM" |
	"BBD" |
	"BDT" |
	"BGN" |
	"BHD" |
	"BIF" |
	"BMD" |
	"BND" |
	"BOB" |
	"BOV" |
	"BRL" |
	"BSD" |
	"BTN" |
	"BWP" |
	"BYN" |
	"BZD" |
	"CAD" |
	"CDF" |
	"CHE" |
	"CHF" |
	"CHW" |
	"CLF" |
	"CLP" |
	"CNY" |
	"COP" |
	"COU" |
	"CRC" |
	"CUC" |
	"CUP" |
	"CVE" |
	"CZK" |
	"DJF" |
	"DKK" |
	"DOP" |
	"DZD" |
	"EGP" |
	"ERN" |
	"ETB" |
	"EUR" |
	"FJD" |
	"FKP" |
	"GBP" |
	"GEL" |
	"GHS" |
	"GIP" |
	"GMD" |
	"GNF" |
	"GTQ" |
	"GYD" |
	"HKD" |
	"HNL" |
	"HRK" |
	"HTG" |
	"HUF" |
	"IDR" |
	"ILS" |
	"INR" |
	"IQD" |
	"IRR" |
	"ISK" |
	"JMD" |
	"JOD" |
	"JPY" |
	"KES" |
	"KGS" |
	"KHR" |
	"KMF" |
	"KPW" |
	"KRW" |
	"KWD" |
	"KYD" |
	"KZT" |
	"LAK" |
	"LBP" |
	"LKR" |
	"LRD" |
	"LSL" |
	"LYD" |
	"MAD" |
	"MDL" |
	"MGA" |
	"MKD" |
	"MMK" |
	"MNT" |
	"MOP" |
	"MRU" |
	"MUR" |
	"MVR" |
	"MWK" |
	"MXN" |
	"MXV" |
	"MYR" |
	"MZN" |
	"NAD" |
	"NGN" |
	"NIO" |
	"NOK" |
	"NPR" |
	"NZD" |
	"OMR" |
	"PAB" |
	"PEN" |
	"PGK" |
	"PHP" |
	"PKR" |
	"PLN" |
	"PYG" |
	"QAR" |
	"RON" |
	"RSD" |
	"RUB" |
	"RWF" |
	"SAR" |
	"SBD" |
	"SCR" |
	"SDG" |
	"SEK" |
	"SGD" |
	"SHP" |
	"SLL" |
	"SOS" |
	"SRD" |
	"SSP" |
	"STN" |
	"SVC" |
	"SYP" |
	"SZL" |
	"THB" |
	"TJS" |
	"TMT" |
	"TND" |
	"TOP" |
	"TRY" |
	"TTD" |
	"TWD" |
	"TZS" |
	"UAH" |
	"UGX" |
	"USD" |
	"USN" |
	"UYI" |
	"UYU" |
	"UYW" |
	"UZS" |
	"VES" |
	"VND" |
	"VUV" |
	"WST" |
	"XAF" |
	"XAG" |
	"XAU" |
	"XBA" |
	"XBB" |
	"XBC" |
	"XBD" |
	"XCD" |
	"XDR" |
	"XOF" |
	"XPD" |
	"XPF" |
	"XPT" |
	"XSU" |
	"XTS" |
	"XUA" |
	"XXX" |
	"YER" |
	"ZAR" |
	"ZMW" |
	"ZWL"

export namespace Currency {
	export function is(currency: Currency | any): currency is Currency {
		return typeof(currency) == "string" && (
		currency == "AED" ||
		currency == "AFN" ||
		currency == "ALL" ||
		currency == "AMD" ||
		currency == "ANG" ||
		currency == "AOA" ||
		currency == "ARS" ||
		currency == "AUD" ||
		currency == "AWG" ||
		currency == "AZN" ||
		currency == "BAM" ||
		currency == "BBD" ||
		currency == "BDT" ||
		currency == "BGN" ||
		currency == "BHD" ||
		currency == "BIF" ||
		currency == "BMD" ||
		currency == "BND" ||
		currency == "BOB" ||
		currency == "BOV" ||
		currency == "BRL" ||
		currency == "BSD" ||
		currency == "BTN" ||
		currency == "BWP" ||
		currency == "BYN" ||
		currency == "BZD" ||
		currency == "CAD" ||
		currency == "CDF" ||
		currency == "CHE" ||
		currency == "CHF" ||
		currency == "CHW" ||
		currency == "CLF" ||
		currency == "CLP" ||
		currency == "CNY" ||
		currency == "COP" ||
		currency == "COU" ||
		currency == "CRC" ||
		currency == "CUC" ||
		currency == "CUP" ||
		currency == "CVE" ||
		currency == "CZK" ||
		currency == "DJF" ||
		currency == "DKK" ||
		currency == "DOP" ||
		currency == "DZD" ||
		currency == "EGP" ||
		currency == "ERN" ||
		currency == "ETB" ||
		currency == "EUR" ||
		currency == "FJD" ||
		currency == "FKP" ||
		currency == "GBP" ||
		currency == "GEL" ||
		currency == "GHS" ||
		currency == "GIP" ||
		currency == "GMD" ||
		currency == "GNF" ||
		currency == "GTQ" ||
		currency == "GYD" ||
		currency == "HKD" ||
		currency == "HNL" ||
		currency == "HRK" ||
		currency == "HTG" ||
		currency == "HUF" ||
		currency == "IDR" ||
		currency == "ILS" ||
		currency == "INR" ||
		currency == "IQD" ||
		currency == "IRR" ||
		currency == "ISK" ||
		currency == "JMD" ||
		currency == "JOD" ||
		currency == "JPY" ||
		currency == "KES" ||
		currency == "KGS" ||
		currency == "KHR" ||
		currency == "KMF" ||
		currency == "KPW" ||
		currency == "KRW" ||
		currency == "KWD" ||
		currency == "KYD" ||
		currency == "KZT" ||
		currency == "LAK" ||
		currency == "LBP" ||
		currency == "LKR" ||
		currency == "LRD" ||
		currency == "LSL" ||
		currency == "LYD" ||
		currency == "MAD" ||
		currency == "MDL" ||
		currency == "MGA" ||
		currency == "MKD" ||
		currency == "MMK" ||
		currency == "MNT" ||
		currency == "MOP" ||
		currency == "MRU" ||
		currency == "MUR" ||
		currency == "MVR" ||
		currency == "MWK" ||
		currency == "MXN" ||
		currency == "MXV" ||
		currency == "MYR" ||
		currency == "MZN" ||
		currency == "NAD" ||
		currency == "NGN" ||
		currency == "NIO" ||
		currency == "NOK" ||
		currency == "NPR" ||
		currency == "NZD" ||
		currency == "OMR" ||
		currency == "PAB" ||
		currency == "PEN" ||
		currency == "PGK" ||
		currency == "PHP" ||
		currency == "PKR" ||
		currency == "PLN" ||
		currency == "PYG" ||
		currency == "QAR" ||
		currency == "RON" ||
		currency == "RSD" ||
		currency == "RUB" ||
		currency == "RWF" ||
		currency == "SAR" ||
		currency == "SBD" ||
		currency == "SCR" ||
		currency == "SDG" ||
		currency == "SEK" ||
		currency == "SGD" ||
		currency == "SHP" ||
		currency == "SLL" ||
		currency == "SOS" ||
		currency == "SRD" ||
		currency == "SSP" ||
		currency == "STN" ||
		currency == "SVC" ||
		currency == "SYP" ||
		currency == "SZL" ||
		currency == "THB" ||
		currency == "TJS" ||
		currency == "TMT" ||
		currency == "TND" ||
		currency == "TOP" ||
		currency == "TRY" ||
		currency == "TTD" ||
		currency == "TWD" ||
		currency == "TZS" ||
		currency == "UAH" ||
		currency == "UGX" ||
		currency == "USD" ||
		currency == "USN" ||
		currency == "UYI" ||
		currency == "UYU" ||
		currency == "UYW" ||
		currency == "UZS" ||
		currency == "VES" ||
		currency == "VND" ||
		currency == "VUV" ||
		currency == "WST" ||
		currency == "XAF" ||
		currency == "XAG" ||
		currency == "XAU" ||
		currency == "XBA" ||
		currency == "XBB" ||
		currency == "XBC" ||
		currency == "XBD" ||
		currency == "XCD" ||
		currency == "XDR" ||
		currency == "XOF" ||
		currency == "XPD" ||
		currency == "XPF" ||
		currency == "XPT" ||
		currency == "XSU" ||
		currency == "XTS" ||
		currency == "XUA" ||
		currency == "XXX" ||
		currency == "YER" ||
		currency == "ZAR" ||
		currency == "ZMW" ||
		currency == "ZWL")
	}
}
