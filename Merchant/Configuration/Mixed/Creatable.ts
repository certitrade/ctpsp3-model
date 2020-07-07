import * as authly from "authly"
import * as gracely from "gracely"

export interface Creatable {
	private: authly.Token,
	public: authly.Token,
}

export namespace Creatable {
	export function is(value: any | Creatable): value is Creatable {
		return typeof(value) == "object" &&
			authly.Token.is(value.private) &&
			authly.Token.is(value.public)
	}
	export function flaw(value: any | Creatable): gracely.Flaw {
		return {
			type: "model.Merchant.Configuration.Mixed.Creatable",
			flaws: typeof value != "object" ? undefined :
				[
					authly.Token.is(value.private) || { property: "private", type: "authly.Token" },
					authly.Token.is(value.public) || { property: "public", type: "authly.Token" },
				].filter(gracely.Flaw.is) as gracely.Flaw[],
		}
	}
}
