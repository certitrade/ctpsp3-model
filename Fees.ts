import {Event} from "./Event"
import * as isoly from "isoly"
export interface Fees{

	currency?:isoly.Currency
	[: Event.Type]:[number,number]

}


export namespace Fees{
	//Calculate functions
}



