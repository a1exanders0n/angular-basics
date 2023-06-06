import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Currency } from 'src/app/interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnChanges {
  @Input() currencies!: Currency[];
  @Input() amount!: string;
  @Input() selectedCurrencyFrom!: Currency;
  @Input() selectedCurrencyTo!: Currency;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
}
