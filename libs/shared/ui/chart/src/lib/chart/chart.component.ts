import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  OnDestroy
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'coding-challenge-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnDestroy {
  @Input() data$: Observable<any>;
  chartData: any;

  chart: {
    title: string;
    type: string;
    data: any;
    columnNames: string[];
    options: any;
  };

  private ngUnsubscribe: Subject<void> = new Subject<void>();
  
  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.chart = {
      title: '',
      type: 'LineChart',
      data: [],
      columnNames: ['period', 'close'],
      options: { title: `Stock price`, width: '600', height: '400' }
    };

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
