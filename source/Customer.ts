import { Address } from "./Address"

export interface Customer {
	name?: string | { first: string, last: string }
	address?: Address | { primary?: Address, billing?: Address, delivery?: Address }
	email?: string | { primary?: string, billing?: string }
	phone?: string
	registrationsNumber?: string
}
