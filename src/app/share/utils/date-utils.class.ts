export class DateUtils {
  static isLeapYear(year: number) {
    return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
  }

  static getDaysInMonth(year: number, month: number) {
    return [31, (this.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
  }


  static addMonths(date: Date, monthOver: number) {
    let dateAfter = new Date(date.getFullYear(), date.getMonth() + monthOver, date.getDate());
    if (dateAfter.getMonth() > date.getMonth() + monthOver) {
      dateAfter = new Date(date.getFullYear(), date.getMonth() + monthOver, this.getDaysInMonth(date.getFullYear(), date.getMonth() + monthOver));
    }
    return dateAfter;
  }

  static checkRangeDate(fromDateCheck: any, toDateCheck: any, fromDate: any, toDate: any): any {
    if (!fromDate || !toDate) {
      return false;
    }
    const fdateCheck = Date.parse(fromDateCheck);
    const tdateCheck = Date.parse(toDateCheck);
    const fdate = Date.parse(fromDate);
    const tdate = Date.parse(toDate);

    if (
      (fdateCheck <= fdate && tdateCheck >= fdate && tdateCheck <= tdate) ||
      (fdateCheck >= fdate && fdateCheck <= tdate && tdateCheck >= fdate && tdateCheck <= tdate) ||
      (fdateCheck <= fdate && tdateCheck >= tdate) ||
      (fdateCheck >= fdate && fdateCheck <= tdate && tdateCheck >= tdate)) {
      return true;
    }
    return false;
  }


  static checkBackDate(date1: Date, date2: Date, backNumber: number): number {
    if (date1 && date2 && date1 instanceof Date && date2 instanceof Date) {
      const backDate = new Date(date2.getFullYear() - backNumber, date2.getMonth(), date2.getDate());
      if (date1.getTime() > backDate.getTime()) {
        return 1;
      } else if (date1.getTime() === backDate.getTime()) {
        return 0;
      } else {
        return -1;
      }
    }

    return null;

  }

  static compareDate(date1: Date, date2: Date, back: number = 0): number {
    if (date1 && date2 && date1 instanceof Date && date2 instanceof Date) {

      const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
      const d2 = new Date(date2.getFullYear() - back, date2.getMonth(), date2.getDate());
      if (d1 > d2) {
        return 1;
      } else if (d1 < d2) {
        return -1;
      } else {
        return 0;
      }
    }
    return null;
  }

  // dd/MM/yy string to Date
  static convertDateString(date: string) {
    let dateParts: any = date.split("/");

    // month is 0-based, that's why we need dataParts[1] - 1
    let dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
    return dateObject
  }
}
