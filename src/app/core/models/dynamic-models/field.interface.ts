
export interface JsonData {
    name: string;
    label: string;
    value?: string;
    type: string;
    validators: Validator[];
    options?: { key: string, value: string}[];
}

export interface Validator {
    name: string;
    validator: any;
    message: string;
}

export interface ReturnData {
  id: number;
  firstName: string;
  lastName:string;
  comments: string;
  dateOfBirth: Date;
  optionSelect: string;
}
