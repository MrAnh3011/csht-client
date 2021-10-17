import {Constant} from '../constants/constant.class';

export function getTypeExport(format: string): string {
  let type: string;
  switch (format) {
    case Constant.EXCEL_TYPE_1:
      type = Constant.EXCEL_MIME_1;
      break;
    case Constant.EXCEL_TYPE_2:
      type = Constant.EXCEL_MIME_2;
      break;
    case Constant.PDF_TYPE:
      type = Constant.PDF_MIME;
      break;
    default:
      type = null;
      break;
  }
  return type;
}
