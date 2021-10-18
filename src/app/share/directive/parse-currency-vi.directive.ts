import {Directive, HostListener, ElementRef} from '@angular/core';
import {NumberUtils} from '../utils/number-utils.class';

@Directive({
  selector: 'input[appParseCurrencyVN]'
})
export class ParseCurrencyViDirective {

  constructor(private _el: ElementRef) {
  }

  @HostListener('keydown', ['$event']) keydown() {
    this._el.nativeElement.value = this._el.nativeElement.value.split('.').join('');
  }

  @HostListener('blur', ['$event']) onBlur() {
    this._el.nativeElement.value = this.formatterCurrency(this._el.nativeElement.value.split('.').join(''));
  }
  formatterCurrency = (value: any) => value ? NumberUtils.currencyFormatVN(value) : null;
}
