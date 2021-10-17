export class ComponentModel {
  key: string;
  label: string = "";
  maxLength: number = 100;
  value: any;
  type: string;
  require: boolean = false;
  order: number = 1;
  defaultValue: any = null;
  placeholder: string;
  isSourceApi: boolean = false;
  isAll: boolean = false;
  categoryCode: string = '';
  categoryValue: any = [];
  categoryValueJSON: string = '';
  isMultiValue: boolean = true;

  constructor() {
    this.key = "";
    this.label = "";
    this.maxLength = 100;
    this.require = false;
    this.order = 1;
    this.defaultValue = '';
    this.isSourceApi = false;
    this.categoryCode = '';
    this.categoryValue = [];
  }

  public initiateTextInput(): ComponentModel {
    let component = new ComponentModel();
    component.key = "TEXT_" + Math.floor((Math.random() * 100) + 1);
    component.type = "TEXT";
    component.label = "Text input";
    component.placeholder = "Text input";
    return component;
  }

  public initiateNumberInput(): ComponentModel {
    let component = new ComponentModel();
    component.key = "NUMBER_" + Math.floor((Math.random() * 100) + 1);
    component.type = "NUMBER";
    component.label = "Number input";
    component.placeholder = "Number input";
    return component;
  }

  public initiateSelect(): ComponentModel {
    let component = new ComponentModel();
    component.key = "SELECT_" + Math.floor((Math.random() * 100) + 1);
    component.type = "SELECT";
    component.label = "Select input";
    component.isSourceApi = false;
    component.placeholder = "Select input";
    component.isMultiValue = false;
    return component;
  }

  public initiateDatetime(): ComponentModel {
    let component = new ComponentModel();
    component.key = "DATE_TIME_" + Math.floor((Math.random() * 100) + 1);
    component.type = "DATE_TIME";
    component.label = "Thời gian";
    component.placeholder = "DD/MM/YYYY";
    component.defaultValue = new Date();
    return component;
  }

}

