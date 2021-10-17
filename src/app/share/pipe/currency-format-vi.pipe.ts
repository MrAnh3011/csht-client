import { Pipe, PipeTransform } from '@angular/core';
import {NumberUtils} from '../utils/number-utils.class';

@Pipe({
  name: 'currencyFormatVN'
})
export class CurrencyFormatVNPipe implements PipeTransform {

  transform(value: number): any {
    if(value) {
      return NumberUtils.currencyFormatVN(value.toString());
    }
    return value;
  }

}
