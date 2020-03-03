import * as authly from "authly"

const productionVerifier = authly.Verifier.create("production", authly.Algorithm.RS256(""))
const developmentVerifier = authly.Verifier.create("development", authly.Algorithm.RS256("MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA+u7ZnXr3XecpcgEbYAPLOrNKZ1V0+JxiPawhOJ+LrbfP5czPB2VnWLyD8xVnZ+0rZnJrG4Iu+AZmpdT44KNAqTpN7xQirLlg+bfUJqGlEDQiSw2rJaa+/Y+dCvoC3MFVtTWMlre6bVmCbX+PIl8tg8rSNN7E+tkkl7T4UuHt/ONVOOOvwCJDo5I0SOotfHSCIckc/CkxLEELgIiR8F800+Ww5ofwzJwLw3zLw0BvqzB4OH74v82DS1mYpS38ZQwQKMcE/BP6eyHokHlmeOaXo993RyWfuVj3ocpbOACaNzqNp9eiREmYY8RfO4r9ZNhkrfetoQxPqQcG+FAiObv/EQIDAQAB"))

export async function verify(token: authly.Token): Promise<authly.Payload | undefined> {
	return productionVerifier && await productionVerifier.verify(token) || developmentVerifier && developmentVerifier.verify(token)
}
