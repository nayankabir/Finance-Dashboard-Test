import {Action} from "@ngrx/store";
import {ReportCardConstant} from "../constants/report-card.constant";
import {Card} from "../model/card";

export class ReportCardsActions {

  static showDetails(card: Card): Action {
    return {
      type: ReportCardConstant.SHOW_DETAILS,
      payload: card
    };
  }

  static hideDetails(card: Card): Action {
    return {
      type: ReportCardConstant.HIDE_DETAILS,
      payload: card
    };
  }

  static addBreadcrumb(breadcrumb): Action {
    return {
      type: ReportCardConstant.ADD_BREADCRUMB,
      payload: breadcrumb
    };
  }

}
