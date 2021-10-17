import { DatePipe } from '@angular/common';
import { FormGroup } from '@angular/forms';

export class FormUtils {
  static isEmpty(form: FormGroup) {
    const formValue = form.getRawValue();
    const formProperties = Object.keys(formValue);
    return formProperties.every( property =>
      formValue[property] === null || formValue[property] === '' || formValue[property] === undefined);
  }

  static setPerfectParam(formValue: any, datePipe: DatePipe, dateFormat: string = 'dd-MM-yyyy'): any {
    const params = Object.assign({}, formValue);
    for (const key of Object.keys(formValue)) {

      if (params[key] === undefined || params[key] === null) {
          delete params[key];
      } else {
        switch (typeof(params[key])) {
          case 'string':
            params[key] = params[key].trim();
            break;
          case 'object':
            if (params[key] instanceof Date) {
              params[key] = datePipe.transform(params[key], dateFormat);
              console.log(params[key]);
            }
            break;
          default:
            break;
        }
      }
    }
    return params;
  }
}
