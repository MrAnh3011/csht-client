import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { JsonData, ReturnData } from 'src/app/core/models/dynamic-models/field.interface';
import { DynamicAddComponent } from './dynamic-add/dynamic-add.component';

@Component({
  selector: 'app-dynamic-component',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.scss']
})
export class DynamicComponent implements OnInit {
  @ViewChild(MatTable) table: MatTable<ReturnData>;
  title = 'dynamic-form';
  formData: JsonData[];
  formDataVal: JsonData[];
  returnData: ReturnData[];
  displayedColumns: string[] = ['modification'];

  constructor(private http: HttpClient, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.http
      .get<Array<JsonData>>('../assets/my-form.json')
      .subscribe((frmData) => {
        this.formData = frmData;
        this.formDataVal = this.formData.filter(x => x.type != 'button');
        this.displayedColumns.unshift(...this.formDataVal.map(item => item.name));
      });
    this.http
      .get<Array<ReturnData>>('../assets/my-data.json')
      .subscribe((rtnData) => (this.returnData = rtnData));
  }

  openDialog(element: any) {
    this.formDataVal.forEach(ele => {
      ele.value = element[ele.name];
    });
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.height = '600px';
    dialogConfig.width = '600px';
    dialogConfig.data = {frmData : this.formDataVal, id: element.id};

    //this.dialog.open(EditDataComponent, dialogConfig);

    const dialogRef = this.dialog.open(DynamicAddComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      console.log(data);
      this.returnData = this.returnData.map(x => x.id === data.id ? data: x);
    });
    this.table.renderRows();
  }

  submit(value: any) {
    //console.log(value);
    this.returnData.push({ ...value, id: this.returnData.length + 1 });
    this.table.renderRows();
  }
  deleteElement(element: any) {
    this.returnData = this.returnData.filter(x => x.id != element.id);
    this.table.renderRows();
  }

}
