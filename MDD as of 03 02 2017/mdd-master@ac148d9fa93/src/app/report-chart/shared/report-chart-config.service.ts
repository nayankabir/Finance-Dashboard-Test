import {Injectable} from '@angular/core';
import Highcharts from 'highcharts';

@Injectable()
export class ReportChartConfigService {

  constructor() {
  }

  getChartConfig(chartData) {
    return {
      chart: {
        type: 'waterfall'
      },

      title: {
        text: 'Highcharts Waterfall'
      },

      plotOptions: {
        series: {
          borderRadius: 5
        }
      },

      xAxis: {
        type: 'category'
      },

      yAxis: {
        title: {
          text: ''
        }
      },

      legend: {
        enabled: false
      },

      tooltip: {
        pointFormat: '<b>${point.y:,.2f}</b> USD'
      },

      series: [{
        upColor: 'rgba(191, 193, 193, 0.7)',
        color: 'rgba(247, 221, 224, 0.7)',
        borderWidth: 0,
        data: chartData,
        dataLabels: {
          verticalAlign: "top",
          enabled: true,
          formatter: function () {
            var prefix = "";
            var fmtPrefix = isNaN(this.point.fmtPrefix) ? this.point.fmtPrefix : "";
            var lastIndex = this.series.points.length - 1;
            if (this.y > 0) {
              prefix = "+";
            } else if (this.y < 0) {
              prefix = "-";
            }
            if (this.point.index === 0 || this.point.index === lastIndex) {
              prefix = "";
              fmtPrefix = "";
            }
            if (this.y >= 1e9) {
              return prefix + fmtPrefix + Highcharts.numberFormat(this.y / 1e9, 0, ',') + "B";
            } else if (this.y >= 1e6) {
              return prefix + fmtPrefix + Highcharts.numberFormat(this.y / 1e6, 0, ',') + "M";
            } else if (this.y >= 1e3) {
              return prefix + fmtPrefix + Highcharts.numberFormat(this.y / 1e3, 0, ',') + "K";
            }
          },
          style: {
            color: '#000',
            fontWeight: 'bold',
            textShadow: 'none'
          }
        },
        states: {
          hover: {
            enabled: false
          }
        },
        pointPadding: 0
      }]
    }
  }

  private format(ctx) {
    var prefix = "";
    var fmtPrefix = isNaN(ctx.point.fmtPrefix) ? ctx.point.fmtPrefix : "";
    var lastIndex = ctx.series.points.length - 1;
    if (ctx.y > 0) {
      prefix = "+";
    } else if (ctx.y < 0) {
      prefix = "-";
    }
    if (ctx.point.index === 0 || ctx.point.index === lastIndex) {
      prefix = "";
      fmtPrefix = "";
    }
    if (ctx.y >= 1e9) {
      return prefix + fmtPrefix + Highcharts.numberFormat(ctx.y / 1e9, 0, ',') + "B";
    } else if (ctx.y >= 1e6) {
      return prefix + fmtPrefix + Highcharts.numberFormat(ctx.y / 1e6, 0, ',') + "M";
    } else if (ctx.y >= 1e3) {
      return prefix + fmtPrefix + Highcharts.numberFormat(ctx.y / 1e3, 0, ',') + "K";
    }
  }

}
