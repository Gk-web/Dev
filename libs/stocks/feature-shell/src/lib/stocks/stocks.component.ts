import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { MatDatepickerInputEvent } from '@angular/material';

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

  timePeriods = [
    { viewValue: 'All available data', value: 'max' },
    { viewValue: 'Five years', value: '5y' },
    { viewValue: 'Two years', value: '2y' },
    { viewValue: 'One year', value: '1y' },
    { viewValue: 'Year-to-date', value: 'ytd' },
    { viewValue: 'Six months', value: '6m' },
    { viewValue: 'Three months', value: '3m' },
    { viewValue: 'One month', value: '1m' }
  ];

  constructor(private fb: FormBuilder, private priceQuery: PriceQueryFacade) {
    this.stockPickerForm = fb.group({
      'symbol': new FormControl('',  [Validators.required]),
      'period': new FormControl(''),
      'startDate': new FormControl(''),
      'endDate': new FormControl('')
    });
  }

  ngOnInit() {}

  setEndDate(event: MatDatepickerInputEvent<Date>) {
    const startDate = this.stockPickerForm.get('startDate').value;
    if (event.value.getTime() < startDate.getTime()){
      this.stockPickerForm.get('endDate').setValue(startDate);
    }
   this.getValues(event);
  }

  setStartDate(event: MatDatepickerInputEvent<Date>){
    const endDate = this.stockPickerForm.get('endDate').value;
    if(event.value.getTime() > endDate.getTime()){
      this.stockPickerForm.get('startDate').setValue(endDate);
    }
    this.getValues(event);
  }

  getValues(event){
    const startDate = this.stockPickerForm.get('startDate').value;
    const endDate = this.stockPickerForm.get('endDate').value;
    if (endDate &&  startDate){
      const symbol = this.stockPickerForm.get('symbol').value;
      const period = 'max';
      this.priceQuery.fetchQuote(symbol, period, startDate, event.value); 
    }
  }

}
