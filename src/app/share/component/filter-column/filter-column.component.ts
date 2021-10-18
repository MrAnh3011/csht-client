import { FilterColumnService } from '../../../core/services/colum-filter.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'filter-column-table',
  templateUrl: './filter-column.component.html',
  styleUrls: ['./filter-column.component.scss']
})
export class FilterColumnTableComponent implements OnInit {
  @Input() storageKey: string;
  @Input() displayColumn: any[];

  constructor(
    private filterColumn: FilterColumnService,
  ) {
  }


  ngOnInit(): void {
    this.displayColumn = this.filterColumn.getDisplayColumn(this.storageKey, this.displayColumn);
  }

  changeColumnFilter() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.displayColumn));
    this.filterColumn.notifyChange();
  }
}
