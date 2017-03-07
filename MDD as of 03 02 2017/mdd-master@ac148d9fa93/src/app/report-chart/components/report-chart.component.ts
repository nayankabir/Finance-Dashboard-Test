import {Component, ElementRef, Input, ChangeDetectionStrategy, OnChanges} from '@angular/core';
import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts-more';
import {ReportChartConfigService} from "../shared/report-chart-config.service";
HighchartsMore(Highcharts);

@Component({
  selector: 'app-report-chart',
  templateUrl: 'report-chart.component.html',
  styleUrls: ['report-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ReportChartConfigService]
})
export class ReportChartComponent implements OnChanges {
  @Input()
  private chartData;

  constructor(private el: ElementRef, private chartConfigService: ReportChartConfigService) {
  }

  ngOnChanges() {
    if (this.chartData) {
      this.redrawChart();
    }
  }

  private redrawChart() {
    Highcharts.chart(this.el.nativeElement, this.chartConfigService.getChartConfig(this.chartData));
  }
}
