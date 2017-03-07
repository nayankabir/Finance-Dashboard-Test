import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import "rxjs/add/operator/map";
import 'rxjs/add/operator/catch';
import {Observable} from "rxjs/Observable";
//In order to run locally please create mashup.config.ts by copying mashup.dev.config.ts or other configs
import {HOST, REPORT_PREFIX, REPORT_PARAMS, METRICS_REPORT_ID} from "../mashup.config";

@Injectable()
export class ReportService {

  private mockHost:string = "mockdata/";
  private defaultFmt:string = "JSON";
  private defaultV:string = "3";
  private defaultDrillDirection:string = "DOWN";

  constructor(private http: Http) {
  }

  getReportData(reportId, useMock) {
    let url = HOST + REPORT_PREFIX + reportId + REPORT_PARAMS;
    if (useMock) {
      return this.http.get(this.mockHost + reportId + ".json").map((res:Response) => res.json());
    } else {
      return this.http.get(url, {withCredentials: true}).map((res:Response) => res.json());
    }
  }

  getMetricCardsData(filterParams, useMock) {
    let url = HOST + REPORT_PREFIX + METRICS_REPORT_ID + filterParams;
    if (useMock) {
      return this.http.get(this.mockHost + METRICS_REPORT_ID + ".json").map((res:Response) => res.json());
    } else {
      return this.http.get(url, {withCredentials: true}).map((res:Response) => res.json());
    }
  }

  getData(reportID, config) {
    let params;
    config = config || {};

    params = {
      fmt: config.fmt || this.defaultFmt,
      v: config.v || this.defaultV
    };
    if (config.selection) {
      params.selection = config.selection
    }

    //TODO: add nested http calls
  }

  doDrill(reportID, params) {
    //TODO: add nested http calls
    return new Observable();
  }

  getConversationID(reportID, usePath) {

  }

  getStoreId(reportID, usePath) {

  }

  applyFilter(reportId, data) {
    var params = {
      fmt: "JSON"
    };

    if (data.checked) {
      params["p_" + data.parameter] = data.value;
    }

    return this.http.get(
      HOST + "/reportData/report/" + reportId, params).map((res:Response) => res.json());
  }

  getReportID(searchPath) {
    return this.http.get(HOST + "/cognosurl/searchPath" + searchPath)
      .map((res:Response) => {
        let data = res.json();
        let index = data.indexOf('storeID');
        return data.substring(index + 9, data.indexOf(')', data.index) - 1);
      })
  }

  getChartData(reportData) {
    let ctabData = reportData.document.pages[0].page.body.item;
    return ctabData.filter(function (item) {
      return item.cht;
    });
  }

  getDrillDefinition(reportData) {
    var drillDefinition = {};
    reportData.document.drillDefinitions.drill.forEach(function (drill) {
      drillDefinition[drill.label] = drill.targetPath
    });
    return drillDefinition;
  }

  getTableData(reportData) {
    let ctabData = reportData.document.pages[0].page.body.item;
    return ctabData.filter(function (item) {
      return item.ctab;
    });
  }

  getDrillData(reportData) {
    let ctabData = reportData.document.pages[0].page.body.item[3].ctab;
    return ctabData.row;
  }

}
