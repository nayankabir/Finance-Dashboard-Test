import { Injectable } from '@angular/core';
import {BreadcrumbsConstant} from "../../breadcrumbs/constants/breadcrumbs.constant";
import {PageMainMetricConstant} from "../constants/page-main-metrics-constant";

@Injectable()
export class PageMainMetricsService {

  constructor() { }

  getMetricsData(reportData, selectedTimeFilter) {
    let periods = reportData.document.pages[0].page.body.item;
    return this.formatMetricsData(periods, selectedTimeFilter);
  }

  private formatMetricsData(periods, selectedTimeFilter) {
    let cardTemplates = this.getCardTemplates(periods[0].ctab.column);
    let values = [];
    let periodMap = [];

    periods.forEach(period => {
      let periodId = (period.ctab.row[0].name.item[0].txt.val).split(" ")[0];
      let columns = period.ctab.column;
      values = [];
      //First value is number(_Diff)
      //Second value is percent(_Prct)
      for(let i = 0; i < columns.length; i += 2) {
        values.push(
          {
            "number":  period.ctab.table[0].row[0].cell[i].item[0].txt.val,
            "pct": period.ctab.table[0].row[0].cell[i+1].item[0].txt.val
          });
      };
      periodMap.push({
        "periodId": periodId,
        "values": values
      });
    });

    //Form final list
    for(let i = 0; i < cardTemplates.length; i++) {
      periodMap.forEach(period => {
        let resultValue = period.values[i].number;
        let notValidPct = isNaN(period.values[i].pct);
        if (!resultValue || notValidPct) {
          //Metric contains no data
          cardTemplates[i].noData = true;
          return;
        }
        let direction = (resultValue.toString().charAt(0) !== "-");
        cardTemplates[i].periods.push(
          {
            name: period.periodId,
            value: +resultValue,
            pct: +period.values[i].pct,
            up: direction,
            use: PageMainMetricConstant.getSelectedTimeFilter(period.periodId)
          }
        );
        if (selectedTimeFilter === PageMainMetricConstant.getSelectedTimeFilter(period.periodId)) {
          cardTemplates[i].selectedPeriod =  cardTemplates[i].periods[cardTemplates[i].periods.length - 1];
        }
      });
    }
    return cardTemplates;
  }

  private getCardTemplates(columns) {
    let metricTemplates = [];
    columns.forEach(column => {
      let metricId = column.name.item[0].txt.val;
      let metricName = PageMainMetricConstant.getMetricName(metricId);
      let id = metricId.replace("_Diff", "").replace("_Prct", "");
      metricTemplates.push(
        {
          id: id,
          name: metricName,
          currSymbol: PageMainMetricConstant.getMetricCurrSymbol(id),
          periods: []
        }
      );
    });

    return _.uniqBy(metricTemplates, "id");
  }

  getMockMetrics() {
    return [
      {
        id: "1",
        up: true,
        name: "POS $",
        description: "+$,% vs LY | +$,% vs Plan",
        periods: [
          {
            "name": "WTD",
            "up": true,
            "value": "$3,000K",
            "pct": "12%"
          },
          {
            "name": "MTD",
            "up": true,
            "value": "$3,000K",
            "pct": "12%"
          },
          {
            "name": "Past W",
            "up": true,
            "value": "$3,000K",
            "pct": "12%"
          }
        ]
      },
      {
        id: "2",
        up: true,
        name: "POS Units",
        description: "+$,% vs LY | +$,% vs Plan",
        periods: [
          {
            "name": "WTD",
            "up": true,
            "value": "$3,000K",
            "pct": "12%"
          },
          {
            "name": "MTD",
            "up": true,
            "value": "$3,000K",
            "pct": "12%"
          },
          {
            "name": "Past W",
            "up": true,
            "value": "$3,000K",
            "pct": "12%"
          }
        ]
      },
      {
        id: "3",
        up: true,
        name: "RGM $",
        description: "+$,% vs LY | +$,% vs Plan",
        periods: [
          {
            "name": "WTD",
            "up": true,
            "value": "$3,000K",
            "pct": "12%"
          },
          {
            "name": "MTD",
            "up": true,
            "value": "$3,000K",
            "pct": "12%"
          },
          {
            "name": "Past W",
            "up": true,
            "value": "$3,000K",
            "pct": "12%"
          }
        ]
      },
      {
        id: "4",
        up: true,
        name: "RGM %",
        description: "+$,% vs LY | +$,% vs Plan",
        periods: [
          {
            "name": "WTD",
            "up": true,
            "value": "$3,000K",
            "pct": "12%"
          },
          {
            "name": "MTD",
            "up": true,
            "value": "$3,000K",
            "pct": "12%"
          },
          {
            "name": "Past W",
            "up": true,
            "value": "$3,000K",
            "pct": "12%"
          }
        ]
      },
      {
        id: "5",
        up: false,
        name: "RVS UNITS",
        description: "+$,% vs LY | +$,% vs Plan",
        periods: [
          {
            "name": "WTD",
            "up": false,
            "value": "$3,000K",
            "pct": "12%"
          },
          {
            "name": "MTD",
            "up": true,
            "value": "$3,000K",
            "pct": "12%"
          },
          {
            "name": "Past W",
            "up": false,
            "value": "$3,000K",
            "pct": "12%"
          }
        ]
      },
      {
        id: "6",
        up: false,
        name: "RVS UNITS",
        description: "+$,% vs LY | +$,% vs Plan",
        periods: [
          {
            "name": "WTD",
            "up": false,
            "value": "$3,000K",
            "pct": "12%"
          },
          {
            "name": "MTD",
            "up": true,
            "value": "$3,000K",
            "pct": "12%"
          },
          {
            "name": "Past W",
            "up": false,
            "value": "$3,000K",
            "pct": "12%"
          }
        ]
      },
      {
        id: "7",
        up: false,
        name: "RVS $",
        description: "+$,% vs LY | +$,% vs Plan",
        periods: [
          {
            "name": "WTD",
            "up": false,
            "value": "$3,000K",
            "pct": "12%"
          },
          {
            "name": "MTD",
            "up": true,
            "value": "$3,000K",
            "pct": "12%"
          },
          {
            "name": "Past W",
            "up": false,
            "value": "$3,000K",
            "pct": "12%"
          }
        ]
      },
      {
        id: "8",
        up: true,
        name: "EGM %",
        description: "+$,% vs LY | +$,% vs Plan",
        periods: [
          {
            "name": "WTD",
            "up": true,
            "value": "$3,000K",
            "pct": "12%"
          },
          {
            "name": "MTD",
            "up": true,
            "value": "$3,000K",
            "pct": "12%"
          },
          {
            "name": "Past W",
            "up": true,
            "value": "$3,000K",
            "pct": "12%"
          }
        ]
      },
    ];
  }

  getRootBreadcrumb() {
    return {
      "index": 0,
      "text": BreadcrumbsConstant.OVERVIEW
    }
  }

}
