import {ComponentModel} from './component.model';

export class FormConfigModel {
  id: number;
  style: number = 4;
  name: string;
  queue: number;
  active: boolean = true;
  configForm: string;
  component: Array<ComponentModel> = new Array<ComponentModel>();
}
