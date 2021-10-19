import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { JsonData } from "../../../../core/models/dynamic-models/field.interface";
@Component({
  selector: "app-date",
  template: `
<mat-form-field class="demo-full-width margin-top" [formGroup]="group">
<input matInput [matDatepicker]="picker" [formControlName]="field.name" [placeholder]="field.label">
<mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
<mat-datepicker #picker></mat-datepicker>
<mat-hint></mat-hint>
</mat-form-field>
`,
  styles: []
})
export class DateComponent implements OnInit {
  field: JsonData;
  group: FormGroup;
  constructor() {}
  ngOnInit() {}
}
