import {Directive, HostListener, ElementRef} from '@angular/core';
import {NgControl} from '@angular/forms';

@Directive({
  selector: 'input[appIsNumber]'
})
export class IsNumberDirective {
  constructor(private _el: ElementRef, private control: NgControl) {
  }

  @HostListener('input', ['$event']) onInputChange(event) {
    const initialValue = this._el.nativeElement.value;
    this._el.nativeElement.value = initialValue.replace(/[^0-9]*/g, '');
    if (initialValue !== this._el.nativeElement.value) {
      this.control.control.setValue(this._el.nativeElement.value);
      event.stopPropagation();
    }
  }

}
