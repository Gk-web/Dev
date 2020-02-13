import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StocksComponent } from './stocks.component';
import { FormBuilder, Validators } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { StoreModule } from '@ngrx/store';
// tslint:disable-next-line: nx-enforce-module-boundaries
import { priceQueryReducer } from 'libs/stocks/data-access-price-query/src/lib/+state/price-query.reducer';

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

  it('should call fetch quote method', () => {
    const fb = new FormBuilder();
    component.stockPickerForm = fb.group({
      symbol: ['AAP', Validators.required],
      period: ['ONE YEAR', Validators.required]
    });
    component.fetchQuote();
    expect(component.stockPickerForm.valid).toEqual(true);
  });
});
