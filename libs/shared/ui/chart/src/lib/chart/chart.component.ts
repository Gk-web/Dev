import {
  Component,
  Input,
  OnInit,
  OnDestroy
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { ChartData, Chart } from '../interface/chart-data.interface';
import { CHART_CONSTANT } from '../constants/chart.constant';

@Component({
  selector: 'coding-challenge-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnDestroy {

  @Input() data$: Observable<any>;

  chartData: ChartData[];

  chart: Chart;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor() {
    this.chart = CHART_CONSTANT;
  }

  ngOnInit() {
    this.data$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(newData => (this.chartData = newData));
  }

  /**
   * Unsubscribes for all subscriptions
   */
  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
