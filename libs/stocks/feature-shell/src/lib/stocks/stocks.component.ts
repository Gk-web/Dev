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
      'startDate': new FormControl(''),
      'endDate': new FormControl('')
    });
    this.timePeriods = TIME_VALUE;
  }

  ngOnInit() { }

  setEndDate(event: MatDatepickerInputEvent<Date>) {
    const startDate = this.stockPickerForm.get('startDate').value;
    if (event && startDate && event.value && event.value.getTime() < startDate.getTime()){
      this.stockPickerForm.get('endDate').setValue(startDate);
    }
   this.getValues(event);
  }

  setStartDate(event: MatDatepickerInputEvent<Date>){
    const endDate = this.stockPickerForm.get('endDate').value;
    if(event && endDate && event.value && event.value.getTime() > endDate.getTime()){
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
