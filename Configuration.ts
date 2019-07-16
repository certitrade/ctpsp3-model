import * as authly from "authly"

export interface Configuration {
	public: authly.Token
	private: authly.Token 
}

export namespace Configuration {
	export function is(value: any | Configuration): value is Configuration {
		return typeof(value) == "object" &&
			authly.Token.is(value.public) &&
			authly.Token.is(value.private)
	}
}
