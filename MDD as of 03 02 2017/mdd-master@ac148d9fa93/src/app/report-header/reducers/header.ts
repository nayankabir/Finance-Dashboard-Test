import {ActionReducer, Action} from "@ngrx/store";
import {ReportHeaderConstant} from "../constants/report-header.constant";
/**
 * Created by irepela on 8/26/2016.
 */
export const header: ActionReducer<boolean> = (state: boolean = false, action: Action) => {
  switch (action.type) {
    case ReportHeaderConstant.FILTER_TOGGLE:
      return action.payload;
    default:
      return state;
  }
}
