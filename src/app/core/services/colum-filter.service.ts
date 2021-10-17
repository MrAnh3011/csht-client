import { TranslateService } from '@ngx-translate/core';
import {Injectable} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class FilterColumnService {

  private changeColumn = new BehaviorSubject(false);
  changeColumnEvent = this.changeColumn.asObservable();

  constructor(
    private translate: TranslateService
  ) {}

  getDisplayColumn(storageKey: string, displayColumn: { label: string, checked: boolean, disabled: boolean}[]): any[] {
    const displayColumnStorage = localStorage.getItem(storageKey);
    if (displayColumnStorage) {
      displayColumn = JSON.parse(displayColumnStorage);
    } else {
      const keys = displayColumn.map((item) =>  item.label);
      this.translate.get(keys).subscribe(res => {
        displayColumn.forEach((item) => {
          item.label = res[item.label];
        });
        localStorage.setItem(storageKey, JSON.stringify(displayColumn));
      });
    }
    return displayColumn;
  }

  notifyChange() {
    this.changeColumn.next(true);
  }
}
