import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Currency } from 'src/app/interfaces';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyComponent implements OnInit {
  public currencies: Currency[] = [];
  public selectedCurrency!: string;

  convertForm: FormGroup = new FormGroup({
    convertFromSelect: new FormControl(),
    convertFromInput: new FormControl(
      localStorage.getItem('amount-from'),
      Validators.pattern('\\-?\\d*\\.?\\d{1,2}')
    ),
    convertToSelect: new FormControl(),
    convertToInput: new FormControl(
      localStorage.getItem('amount-to'),
      Validators.pattern('\\-?\\d*\\.?\\d{1,2}')
    ),
  });

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

    this.convertForm.controls['convertFromInput'].valueChanges.subscribe(
      (val) => console.log(this.convertForm.controls['convertFromInput'])
    );

    // this.amount = localStorage.getItem('amount') as string;
  }

  onCurrencyChange(event: any) {
    this.selectedCurrency = event.target.value;
  }

  changeAmountFrom(event: any): void {
    // console.log(event);
    localStorage.setItem('amount-from', event.target.value);
    if (event.target.value === '') {
      localStorage.removeItem('amount-from');
    }
  }
  changeAmountTo(event: any): void {
    // console.log(event);
    localStorage.setItem('amount-to', event.target.value);

    if (event.target.value === '') {
      localStorage.removeItem('amount-to');
    }
  }
}
