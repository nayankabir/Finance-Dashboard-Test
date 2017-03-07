import {ActionReducer, Action} from "@ngrx/store";
import {ReportFilterConstant} from "../constants/report-filter-constant";
import {FilterModel} from "../model/filterModel";
/**
 * Created by irepela on 8/26/2016.
 */
export const reportFilters: ActionReducer<FilterModel> = (state: FilterModel, action: Action) => {
  switch (action.type) {
    case ReportFilterConstant.FILTERS_READY:
      return action.payload;
    default:
      return state;
  }
}
