export interface Merchant {
	id: string
	paymentMethods: (string | { name: string } & any)[]
}
