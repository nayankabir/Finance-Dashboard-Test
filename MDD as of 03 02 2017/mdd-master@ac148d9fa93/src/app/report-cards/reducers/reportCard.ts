import {ActionReducer, Action} from "@ngrx/store";
import {Card} from "../model/card";
import {ReportCardConstant} from "../constants/report-card.constant";
/**
 * Created by irepela on 8/26/2016.
 */
export const reportCard: ActionReducer<Card> = (state: Card, action: Action) => {
  switch (action.type) {
    case ReportCardConstant.SHOW_DETAILS:
      return Object.assign({}, action.payload);
    case ReportCardConstant.HIDE_DETAILS:
      return Object.assign({}, state, {"showMetricDetails": false});
    default:
      return state;
  }
}
