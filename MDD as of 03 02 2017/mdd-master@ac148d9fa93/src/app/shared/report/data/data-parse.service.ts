import { Injectable } from '@angular/core';

@Injectable()
export class DataParseService {

  constructor() { }

  formatChartData(data) {
    var charts = [];

    data.forEach(function (chart) {
      var formattedData = [];
      var total = {
        name: "Total",
        y: 0,
        color: "rgba(227, 229, 235, 0.7)",
        isSum: true,
        fmtPrefix: 0
      };
      chart.cht.details.cgsWidget[0].cgsData.table[0].group.row.forEach(function (item, index) {
        formattedData.push({
          name: item.cell[0].item[0].txt.fmtVal,
          y: +item.cell[1].item[0].txt.val,
          fmtPrefix: item.cell[1].item[0].txt.fmtVal[item.cell[1].item[0].txt.fmtVal.length - 1],
          color: index === 0 ? "rgba(227, 229, 235, 0.7)" : +item.cell[1].item[0].txt.val < 0 ?
            "rgba(255, 127, 143, 0.7)" : "rgba(171, 210, 127, 0.7)"
        });
        total.y += +item.cell[1].item[0].txt.val;
        total.fmtPrefix = item.cell[1].item[0].txt.fmtVal[item.cell[1].item[0].txt.fmtVal.length - 1];
      });
      formattedData.push(total);

      charts.push({
        data: formattedData,
        title: chart.cht.details.cgsWidget[0].cgsData.table[0].colTitle[0].item[0].txt.fmtVal
      });

    });
    return charts;
  }
}
