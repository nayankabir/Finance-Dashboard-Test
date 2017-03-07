import {Action} from "@ngrx/store";
import {ReportFilterConstant} from "../constants/report-filter-constant";

export class ReportFiltersActions {

  static filtersReady(data): Action {
    return {
      type: ReportFilterConstant.FILTERS_READY,
      payload: data
    };
  }

  static applyFilters(data): Action {
    return {
      type: ReportFilterConstant.APPLY_FILTERS,
      payload: data
    };
  }
}
