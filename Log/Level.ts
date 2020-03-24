export type Level =
	"trace" |
	"debug" |
	"warning" |
	"error" |
	"fatal"

export namespace Level {
	export function is(value: Level | any): value is Level {
		return value == "trace" ||
			value == "debug" ||
			value == "warning" ||
			value == "error" ||
			value == "fatal"
	}
}