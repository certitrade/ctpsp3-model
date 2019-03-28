import { Error } from "../Error"
import { Response } from "../Response"

export function missingQueryArgument(name: string, type: string, description: string): Error & { argument: { name: string, type: string, description: string }, response: Response } {
	return Response.add({ status: 400, type: "missing query argument", argument: { name, type, description } })
}
export namespace missingQueryArgument {
	export function is(value: any): value is { status: 400, type: "missing query argument", argument: { name: string, type: string, description: string } } {
		return Error.is(value) && value.status == 400 && value.type == "missing query argument"
	}
}
