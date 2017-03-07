import {Action} from "@ngrx/store";
import {ReportHeaderConstant} from "../constants/report-header.constant";
export class ReportHeaderActions {
  static toggleFilter(showFilters: boolean): Action {
    return {
      type: ReportHeaderConstant.FILTER_TOGGLE,
      payload: showFilters
    };
  }
}
