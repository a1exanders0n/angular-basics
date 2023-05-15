import { Pipe, PipeTransform } from '@angular/core';
import { Currency } from '../interfaces';

@Pipe({
  name: 'currencyStyle',
})
export class CurrencyStylePipe implements PipeTransform {
  transform(value: string): any {
    return '<b><i>' + value + '</i></b>';
  }
}
