import {PipeTransform, Pipe} from "@angular/core";

/*
 * Formats currency
 * Takes useUp and up flags
 * Usage:
 *   value | cardCurrency
 * Example:
 *   {{99.76754674 | cardPercent}}
 *   formats to: 99.7%
 *
 *   {{3.4467 | cardPercent:true:true}}
 *   formats to: +3.4%
 */
@Pipe({name: "cardPercent"})
export class CardPercentPipe implements PipeTransform{
  transform(value: number, useUp: boolean, up: boolean) {
    let result: string = "";
    if (useUp) {
      result = up ? "+" : "(";
      result += Math.abs(value).toFixed(1) + "%";
      result += up ? "" : ")"
    } else {
      result += Math.abs(value).toFixed(1) + "%";
    }
    return result;
  }
}
