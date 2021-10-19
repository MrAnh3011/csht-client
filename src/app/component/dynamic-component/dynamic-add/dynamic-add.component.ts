import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { JsonData } from 'src/app/core/models/dynamic-models/field.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dynamic-add',
  templateUrl: './dynamic-add.component.html',
  styleUrls: ['./dynamic-add.component.scss']
})
export class DynamicAddComponent implements OnInit {

  fields: JsonData[];
  form: FormGroup = this.fb.group({});
  description: string;
  id: number;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<DynamicAddComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
      this.fields = data.frmData;
      this.id = data.id;
  }

  ngOnInit() {
      this.form = this.createForm(this.fields);
  }

  createForm(fields: JsonData[]) {
      const group = this.fb.group({});
      fields.forEach(element => {
          if (element.type === "button") return;
          const control = this.fb.control(element.value);
          group.addControl(element.name, control);
      });
      group.addControl('id', this.fb.control(this.id));
      return group;
  }

  SaveDialog() {
      this.dialogRef.close(this.form.value);
  }

  CloseDialog() {
      this.dialogRef.close();
  }
}
