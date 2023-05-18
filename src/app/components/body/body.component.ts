import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Currency } from 'src/app/interfaces';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyComponent implements OnInit {
  public currencies: Currency[] = [];
  public selectedCurrency!: string;
  public amount: string =
    (localStorage.getItem('amount') as string) || 'Enter amount';

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.http
      .get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
      .subscribe((result: any) => {
        this.currencies = result;

        // for zero currencies
        // this.currencies = [];

        // for 1 currency
        // this.currencies = [
        //   {
        //     r030: 348,
        //     txt: 'Форинт',
        //     rate: 0.107719,
        //     cc: 'HUF',
        //     exchangedate: '16.05.2023',
        //   },
        // ];
      });
    // this.amount = localStorage.getItem('amount') as string;
  }

  onCurrencyChange(event: any) {
    this.selectedCurrency = event.target.value;
  }

  changeText(event: any): void {
    // console.log(event);
    localStorage.setItem('amount', event.target.value);
    if (event.target.value === '') {
      localStorage.removeItem('amount');
    }
  }
}
