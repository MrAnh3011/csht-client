import {TableSelectionInterface} from './table-selection.interface';

export abstract class TableSelectionAbstract implements TableSelectionInterface {

  isAllDisplayDataChecked = false;
  isOperating = false;
  isIndeterminate = false;
  listOfDisplayData: any[] = [];
  listOfAllData: any[] = [];
  prop: string;

  mapOfCheckedId: { [key: number]: boolean } = {};
  numberOfChecked = 0;


  constructor(prop: string) {
    this.prop = prop;
  }

  setListOfAllData(listOfAllData: any[]) {
    this.listOfAllData = listOfAllData.map(item => {
      return Object.assign({}, item);
    });
  }

  currentPageDataChange($event: readonly any[]): void {
    this.listOfDisplayData = $event as any[];
    this.refreshStatus();
  }

  currentPageDataChangeRequest($event: any[]): void {
    this.listOfDisplayData = $event;
    this.refreshStatusRequest();
  }

  refreshStatusRequest(value?: boolean, obj?: any, childrenName?: string): void {
  }

  refreshStatusApproved(value?: boolean, obj?: any, childrenName?: string): void {
  }

  refreshStatus(value?: boolean, obj?: any, childrenName?: string): void {
    this.isAllDisplayDataChecked = this.listOfDisplayData.every(item => this.mapOfCheckedId[item[this.prop]]);
    this.isIndeterminate =
      this.listOfDisplayData.some(item => this.mapOfCheckedId[item[this.prop]]) &&
      !this.isAllDisplayDataChecked;
    this.numberOfChecked = this.listOfAllData.filter(item => this.mapOfCheckedId[item[this.prop]]).length;
    if (value !== undefined && obj !== undefined && childrenName !== undefined) {
      this.setChildrenStatus(value, obj, childrenName);
    }

  }

  setChildrenStatus(value: boolean, obj: any, childrenName: string) {
    if (obj[childrenName] !== null && obj[childrenName].length > 0) {
      for (const child of obj[childrenName]) {
        this.mapOfCheckedId[child[this.prop]] = value;
        this.setChildrenStatus(value, child, childrenName);
      }
    }
    return;
  }

  checkAllRowRequest(value: boolean, childrenName?: string): void {
    this.refreshStatusRequest();
  }

  checkAllRowApproved(value: boolean, childrenName?: string): void {
    this.refreshStatusApproved();
  }

  checkAllRow(value: boolean, childrenName?: string): void {
    this.listOfDisplayData.forEach(item => {
        this.mapOfCheckedId[item[this.prop]] = value;
        if (childrenName !== undefined) {
          this.setChildrenStatus(value, item, childrenName);
        }
      }
    );
    this.refreshStatus();
  }

  checkAll(value: boolean): void {
    this.listOfAllData.forEach(item => (this.mapOfCheckedId[item[this.prop]] = value));
    this.refreshStatus();
  }

  getCheckedIdList(searchText?: string, searchData?: any[]): number[] {
    const listIds: number[] = [];
    let isChecked = false;
    Object.keys(this.mapOfCheckedId).forEach(key => {
      if (this.mapOfCheckedId[key]) {
        listIds.push(Number(key));
        isChecked = true;
      }
    });

    if (searchData !== undefined
      && searchText !== undefined
      && (searchText.trim()).length > 0
      && !isChecked
    ) {
      searchData.forEach(item => {
        listIds.push(item[this.prop]);
      });
    }
    return listIds;
  }


}
