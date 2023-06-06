import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { Currency } from 'src/app/interfaces';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyComponent implements OnInit {
  public currencies: Currency[] = [];
  public selectedCurrencyFrom: Currency = {
    cc: 'AUD',
    exchangedate: '29.05.2023',
    r030: 36,
    rate: 23.9177,
    txt: 'Австралійський долар',
  };
  public selectedCurrencyTo: Currency = {
    cc: 'AUD',
    exchangedate: '29.05.2023',
    r030: 36,
    rate: 23.9177,
    txt: 'Австралійський долар',
  };

  convertForm: FormGroup = new FormGroup({
    convertFromSelect: new FormControl(),
    convertFromInput: new FormControl(
      '1',
      Validators.pattern('\\-?\\d*\\.?\\d*')
    ),
    convertToSelect: new FormControl(),
    convertToInput: new FormControl(
      '1',
      Validators.pattern('\\-?\\d*\\.?\\d*')
    ),
  });

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
      .subscribe((result: any) => {
        this.currencies = result;
      });
  }

  onCurrencyChangeFrom(event: any) {
    this.selectedCurrencyFrom = this.currencies.find(
      (currency) =>
        currency.txt.toLowerCase() === event.target.value.toLowerCase()
    ) as Currency;
    this.convertForm.controls['convertToInput'].setValue(
      (this.convertForm.controls['convertFromInput'].value *
        this.selectedCurrencyFrom.rate) /
        this.selectedCurrencyTo.rate
    );
  }

  onCurrencyChangeTo(event: any) {
    this.selectedCurrencyTo = this.currencies.find(
      (currency) =>
        currency.txt.toLowerCase() === event.target.value.toLowerCase()
    ) as Currency;
    this.convertForm.controls['convertToInput'].setValue(
      (this.convertForm.controls['convertFromInput'].value *
        this.selectedCurrencyFrom.rate) /
        this.selectedCurrencyTo.rate
    );
  }

  onKeyUpFrom(event: any): void {
    this.convertForm.controls['convertToInput'].setValue(
      (this.convertForm.controls['convertFromInput'].value *
        this.selectedCurrencyFrom.rate) /
        this.selectedCurrencyTo.rate
    );
  }

  onKeyUpTo(event: any): void {
    this.convertForm.controls['convertFromInput'].setValue(
      (this.convertForm.controls['convertToInput'].value *
        this.selectedCurrencyTo.rate) /
        this.selectedCurrencyFrom.rate
    );
  }
}
