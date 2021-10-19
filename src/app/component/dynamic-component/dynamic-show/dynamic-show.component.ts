import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { JsonData } from 'src/app/core/models/dynamic-models/field.interface';

@Component({
  selector: 'app-dynamic-show',
  templateUrl: './dynamic-show.component.html',
  styleUrls: ['./dynamic-show.component.scss']
})
export class DynamicShowComponent implements OnChanges {
  
  @Input() fields: JsonData[] = [];
  @Output() submit: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup = this.fb.group({});

  get value() {
    return this.form.value;
  }
  constructor(private fb: FormBuilder) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.fields.firstChange) {
      this.form = this.createForm(this.fields);
    }
  }

  createForm(fields: JsonData[]) {
    const group = this.fb.group({});
    fields.forEach(element => {
      if (element.type === "button") return;
      const control = this.fb.control(element.value);
      group.addControl(element.name, control);
    });
    return group;
  }

  onSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.form.valid) {
      this.submit.emit(this.form.value);
    }
  }

}
