import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyStyle',
})
export class CurrencyStylePipe implements PipeTransform {
  transform(value: string): any {
    return '<b>' + value + '</b>';
  }
}
