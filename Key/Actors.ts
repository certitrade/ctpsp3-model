import * as authly from "authly"
import * as card from "@cardfunc/model"
import { V1 } from "./V1"
import { Key } from "./Key"
import { Audience } from "./Audience"

export function getVerifier(
	secrets?:
		| { signing: string; property: string }
		| { signing: string; property: string; signingV1: string; propertyV1: string }
): authly.Verifier<Key> {
	const verifierTransformations: authly.Property.Transformer[] = []
	const algorithm: authly.Algorithm[] = []

	const legacyCrypto = authly.Property.Crypto.create(
		secrets && "propertyV1" in secrets ? secrets.propertyV1 : undefined,
		"acquirer",
		"emv3d"
	) as authly.Property.Transformer
	const upgradeFromV1 = authly.Property.Transformer.create({
		reverse: async (oldKey: V1 | authly.Payload) => {
			let result: Key | authly.Payload | undefined = oldKey
			if (V1.is(oldKey)) {
				result = await Key.upgrade(
					oldKey,
					authly.Token.is(oldKey.option.card) ? getCardVerifier(legacyCrypto, ...algorithm) : undefined
				)
			}
			return result
		},
	})
	verifierTransformations.push(upgradeFromV1, legacyCrypto)
	if (secrets) {
		algorithm.push(authly.Algorithm.create("HS256", secrets.signing))
		verifierTransformations.unshift(new authly.Property.Typeguard<Key>(Key.is))
		if ("propertyV1" in secrets)
			algorithm.push(authly.Algorithm.create("HS256", secrets.signingV1))
		const crypto = authly.Property.Crypto.create(
			secrets.property,
			"mash",
			"sms",
			"email",
			"option.mash",
			"option.sms",
			"option.email",
			"card.acquirer",
			"card.emv3d"
		) as authly.Property.Transformer
		verifierTransformations.push(crypto)
	}
	return authly.Verifier.create<Key>(...algorithm).add(...verifierTransformations)
}

export function getIssuer(secrets?: {
	signing: string
	property: string
}): authly.Issuer<Omit<Key, "iat">> | undefined {
	const issuerTransformations: authly.Property.Transformer[] = secrets
		? [
				new authly.Property.Typeguard<Key>(Key.is),
				authly.Property.Crypto.create(
					secrets.property,
					"mash",
					"sms",
					"email",
					"option.mash",
					"option.sms",
					"option.email",
					"card.acquirer",
					"card.emv3d"
				),
		  ]
		: []
	const algorithm = secrets ? authly.Algorithm.create("HS256", secrets.signing) : undefined
	return authly.Issuer.create<Omit<Key, "iat">>("payfunc", algorithm)?.add(...issuerTransformations)
}
export async function unpack(token: authly.Token, ...audience: Audience[]): Promise<Key.Information | undefined> {
	return (await getVerifier().verify(token, ...audience)) as Key.Information
}

function getCardVerifier(
	legacyCrypto: authly.Property.Transformer,
	...algorithms: authly.Algorithm[]
): authly.Verifier<card.Merchant.Key> {
	const cardTransformations: authly.Property.Transformer[] = [
		authly.Property.Transformer.create({ reverse: card.Merchant.Key.upgrade }),
		legacyCrypto,
	].filter(authly.Property.Transformer.is)
	return authly.Verifier.create<card.Merchant.Key>(...algorithms)?.add(...cardTransformations)
}
