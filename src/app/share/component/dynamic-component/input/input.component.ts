import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { JsonData } from "../../../../core/models/dynamic-models/field.interface";

@Component({
  selector: "app-input",
  template: `
<mat-form-field class="demo-full-width" [formGroup]="group">
<input matInput [formControlName]="field.name" [placeholder]="field.label" [type]="field.type">
</mat-form-field>
`,
  styles: []
})
export class InputComponent implements OnInit {
  field: JsonData;
  group: FormGroup;
  constructor() {}
  ngOnInit() {}
}
