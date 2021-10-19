import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { JsonData } from "../../../../core/models/dynamic-models/field.interface";
@Component({
  selector: "app-select",
  template: `
<mat-form-field class="demo-full-width margin-top" [formGroup]="group">
<mat-select [placeholder]="field.label" [formControlName]="field.name">
<mat-option *ngFor="let item of field.options" [value]="item.value">{{item.value}}</mat-option>
</mat-select>
</mat-form-field>
`,
  styles: []
})
export class SelectComponent implements OnInit {
  field: JsonData;
  group: FormGroup;
  constructor() { }
  ngOnInit() { }
}
