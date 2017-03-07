import {PipeTransform, Pipe} from "@angular/core";

/*
 * Formats currency
 * Takes format(M, K, F-default) and up(true-default or false)
 * Usage:
 *   value | cardCurrency:M:true
 * Example:
 *   {{12056 | cardCurrency:K:false}}
 *   formats to: ($12,000K)
 *
 *   {{5120070 | cardCurrency:M:true}}
 *   formats to: +$5M
 */
@Pipe({name: "cardCurrency"})
export class CardCurrencyPipe implements PipeTransform{
  transform(value: number, format: string, currSymbol: string, up: boolean) {
    switch(format) {
      case "M":
            return this.formatMillions(value, up, currSymbol);
      case "K":
            return this.formatThousands(value, up, currSymbol);
      default:
        return currSymbol + value;
    }
  }

  formatMillions(value, up, currSymbol) {
    if (isNaN(value)) {
      return "-";
    }
    let result = up ? ("+" + currSymbol) : ("(" + currSymbol);
    result += (Math.abs(value)/1000000).toFixed(1) + "M";
    result += up ? "" : ")"
    return result;
  }

  formatThousands(value, up, currSymbol) {
    if (isNaN(value)) {
      return "-";
    }
    let result = up ? ("+" + currSymbol) : ("(" + currSymbol);
    result += (Math.abs(value)/1000).toFixed(1) + "K";
    result += up ? "" : ")"
    return result;
  }
}
