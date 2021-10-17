import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, length?: number, ending: string = '...'): string {
    length = length ? length : 30;
    if (value && value.length > length) {
      return value.substring(0, length - ending.length) + ending;
    }
    return value;
  }

}
