import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StocksComponent } from './stocks.component';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { StoreModule } from '@ngrx/store';
// tslint:disable-next-line: nx-enforce-module-boundaries
import { priceQueryReducer } from 'libs/stocks/data-access-price-query/src/lib/+state/price-query.reducer';
import { MatDatepickerInputEvent } from '@angular/material';

describe('StocksComponent', () => {
  let component: StocksComponent;
  let fixture: ComponentFixture<StocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StocksComponent ],
      imports: [StoreModule.forRoot(priceQueryReducer)],
      providers: [FormBuilder, PriceQueryFacade],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set End Date', () => {
    const  event = new Date() as unknown as MatDatepickerInputEvent<Date>;
    const fb = new FormBuilder();
    component.stockPickerForm = fb.group({
      symbol: ['AAP', Validators.required],
      startDate: ['2/13/2020', Validators.required],
      endDate: ['1/13/2020', Validators.required]
    });
    component.setEndDate(event);
    expect(component.stockPickerForm.get('endDate').value).toEqual('1/13/2020');
    expect(component).toBeTruthy();
  });
  
  it('should set start Date', () => {
    const  event = new Date() as unknown as MatDatepickerInputEvent<Date>;
    const fb = new FormBuilder();
    component.stockPickerForm = fb.group({
      symbol: ['AAP', Validators.required],
      startDate: ['2/13/2020', Validators.required],
      endDate: ['1/13/2020', Validators.required]
    });
    component.setStartDate(event);
    expect(component.stockPickerForm.get('endDate').value).toEqual('1/13/2020');
    expect(component).toBeTruthy();
  });

  it('should call get data', () => {
    const  event = new Date() as unknown as MatDatepickerInputEvent<Date>;
    const fb = new FormBuilder();
    component.stockPickerForm = fb.group({
      symbol: ['AAP', Validators.required],
      startDate: ['2/13/2020', Validators.required],
      endDate: ['1/13/2020', Validators.required]
    });
    component.getValues(event);
    expect(component.stockPickerForm.get('endDate').value).toEqual('1/13/2020');
    expect(component).toBeTruthy();
  });
});