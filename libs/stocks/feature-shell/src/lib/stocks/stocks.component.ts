import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { MatDatepickerInputEvent } from '@angular/material';
import { TIME_VALUE } from '../constants/stocks.constant';
import { TimePeriodInterface } from '../interface/stocks.interface';

@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  stockPickerForm: FormGroup;
  symbol: string;
  period: string;

  quotes$ = this.priceQuery.priceQueries$;
  
  maxDate = new Date();

  timePeriods: TimePeriodInterface[];

  constructor(private fb: FormBuilder, private priceQuery: PriceQueryFacade) {
    this.stockPickerForm = fb.group({
      'symbol': new FormControl('',  [Validators.required]),
      'period': new FormControl(''),
      'startDate': new FormControl(''),
      'endDate': new FormControl('')
    });
    this.timePeriods = TIME_VALUE;
  }

  ngOnInit() { }

  /**
   * method to fetch stock data with selected period and symbol
   */
  fetchQuote() {
    if (this.stockPickerForm.valid) {
      const { symbol, period } = this.stockPickerForm.value;
      this.priceQuery.fetchQuote(symbol, period);
    }
  }

}
