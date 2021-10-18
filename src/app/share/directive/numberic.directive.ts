import { Directive, HostListener, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[appNumberic]'
})
export class NumbericDirective {

    @Input() decimals = 2;
    @Input() num = 2;

    private check(value: string) {
        if (this.decimals <= 0) {
            return String(value).match(new RegExp(/^\d+$/));
        } else {
            const regExpString =
                '^\\s*((\\d{1,' + this.num + '}(\\.\\d{0,' +
                this.decimals +
                '})?)|((\\d{1,' + this.num + '}(\\.\\d{1,' +
                this.decimals +
                '}))))\\s*$';
            return String(value).match(new RegExp(regExpString));
        }
    }

    private run(oldValue: any) {
        setTimeout(() => {
            const currentValue: string = this.el.nativeElement.value;
            if (currentValue !== '' && !this.check(currentValue)) {
                this.el.nativeElement.value = oldValue;
            }
        });
    }

    constructor(private el: ElementRef) {}

    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent) {
        this.run(this.el.nativeElement.value);
    }

    @HostListener('paste', ['$event'])
    onPaste(event: ClipboardEvent) {
        this.run(this.el.nativeElement.value);
    }

}
