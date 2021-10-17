export class NumberUtils {
  static currencyFormat(value: any) {
    if (!value) {
      return null;
    }
    if (typeof value === 'string') {
      value = parseFloat(value);
    }
    value = value.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    return value;
  }

  static convertCurrencyToNumber(value: any): number {
    if (value) {
      return Number(value.toString().replace(/,/g, ''));
    }
    return null;
  }

  static currencyFormatVN(value: any) {
    if (typeof value === 'string') {
      value = parseFloat(value);
    }
    value = value.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.');
    return value;
  }

  static convertCurrencyToNumberVN(value: any): number {
    if (value) {
      return Number(value.toString().split('.').join(''));
    }
    return null;
  }

}
