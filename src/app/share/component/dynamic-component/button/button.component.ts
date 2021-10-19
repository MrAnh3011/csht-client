import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { JsonData } from "../../../../core/models/dynamic-models/field.interface";

@Component({
    selector: "app-button",
    template: `
<div [formGroup] = "group">
    <button type="submit" mat-raised-button color = "primary">{{field.label}}</button>
</div>
    `,
    styles: []
})
export class ButtonComponent implements OnInit {
    field: JsonData;
    group: FormGroup;

    ngOnInit(): void {
    }
}