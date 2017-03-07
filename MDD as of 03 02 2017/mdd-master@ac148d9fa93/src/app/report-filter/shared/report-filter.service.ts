import {Injectable} from '@angular/core';
import * as _ from "lodash";
import {ReportFilterConstant} from "../constants/report-filter-constant";

@Injectable()
export class ReportFilterService {

  constructor() {
  }

  private kpiFilter;
  private initialFilters;

  getKPIFilter() {
    return this.kpiFilter;
  }

  getInitialFilters() {
    return Object.freeze(this.initialFilters);
  }

  getFilterData(reportData) {
    let ctabData = reportData.document.pages[0].page.body.item[1].tbl.trow;
    this.initialFilters = reportData;
    return this.formatFilterData(ctabData);
  }

  private formatFilterData(data) {
    var filtersData = [];
    //For not expandable filters
    var topFilters = [this.getFormatterFilter()];
    //Form data for filters template
    data.forEach(filter => {
      let currentGroup = filter.tcell[0].item;
      let filterGroup = currentGroup[1].p_value;
      filterGroup.name = currentGroup[0].txt.val.toUpperCase();
      //Handle case with double dropdown
      if (currentGroup.length === 4) {
        filterGroup.vsFilter = currentGroup[3].p_value;
        filterGroup.vsFilter.name = currentGroup[2].txt.val;
        filterGroup.selectUI = ReportFilterConstant.MULTI_DROP_DOWN;
      }

      //Add selected property to correctly display default state
      let optionsArr = filterGroup.selOptions.sval;
      let selectedArr = filterGroup.selChoices.sval;
      this.setSelectedOption(filterGroup, optionsArr, selectedArr);
      if (filterGroup.id === ReportFilterConstant.TIME_FILTER_ID ||
        filterGroup.id === ReportFilterConstant.COMPARE_FILTER_ID) {
        topFilters.push(filterGroup);
      } else {
        if (filterGroup.id === ReportFilterConstant.KPI_FILTER_ID) {
          this.kpiFilter = filterGroup;
        } else {
          filtersData.push(filterGroup);
        }
      }
    });
    return {
      "topFilters": topFilters,
      "filtersData": filtersData
    };
  }

  getParams(filters) {
    var params = "?";
    for(let i = 0; i < filters.length; i++) {
      if (filters[i].id !== "fCurrencyFomatter") {

        params += "p_" + filters[i].pname + "=" + filters[i].selectedOption.use + "&";
        if (filters[i].vsFilter) {
          params += "p_" + filters[i].vsFilter.pname + "=" + filters[i].vsFilter.selectedOption.use + "&";
        }
      }
    }
    params += "fmt=JSON&async=OFF";
    return params;
  }

  getSelectedTimePeriod(filters) {
    let selected = "1";
    for(let i = 0; i < filters.length; i++) {
      if (filters[i].id === ReportFilterConstant.TIME_FILTER_ID) {
        selected = filters[i].selectedOption.use;
      }
    }
    return selected;
  }

  private setSelectedOption(filterGroup, optionsArr, selectedArr) {
    _.intersectionBy(optionsArr, selectedArr, "use").forEach(filter => {
      filter.selected = true;
      if (filterGroup.selectUI === ReportFilterConstant.RADIO_BUTTON) {
        filterGroup.model = {"use": filter.use};
      }
      //set selected option for drop downs for easier bind in html template
        filterGroup.selectedOption = filter;
        if (filterGroup.vsFilter) {
          let optionsArr = filterGroup.vsFilter.selOptions.sval;
          let selectedArr = filterGroup.vsFilter.selChoices.sval;
          this.setSelectedOption(filterGroup.vsFilter, optionsArr, selectedArr);
        }
    });
  }

  private getFormatterFilter() {
    return {
      id: "fCurrencyFomatter",
      name: "SHOW REPORT IN",
      selChoices: [
        {
          disp: "K - Thousands",
          selected: true,
          use: "2"
        }
      ],
      selOptions: {
        sval: [
          {
            disp: "M - Millions",
            use: "1"
          },
          {
            disp: "K - Thousands",
            selected: true,
            use: "2"
          },
          {
            disp: "Full",
            use: "3"
          }
        ]
      },
      selectUI: "DROP_DOWN",
      selectedOption: {
        disp: "M - Millions",
        use: "1",
        selected: true
      }
    };
  }
}
