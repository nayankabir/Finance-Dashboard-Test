import {ActionReducer, Action} from "@ngrx/store";
import {PageMainMetricConstant} from "../constants/page-main-metrics-constant";
import {MetricsModel} from "../model/metricsModel";
/**
 * Created by irepela on 8/26/2016.
 */
export const pageMainMetrics: ActionReducer<MetricsModel> = (state: MetricsModel, action: Action) => {
  switch (action.type) {
    case PageMainMetricConstant.APPLY_FILTERS:
      return Object.assign({}, action.payload);
    case PageMainMetricConstant.METRICS_LOADED:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
