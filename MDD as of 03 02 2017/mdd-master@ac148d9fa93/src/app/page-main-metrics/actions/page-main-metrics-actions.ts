import {Action} from "@ngrx/store";
import {PageMainMetricConstant} from "../constants/page-main-metrics-constant";

export class PageMainMetricsActions {

  static metricsLoaded(data): Action {
    return {
      type: PageMainMetricConstant.METRICS_LOADED,
      payload: data
    };
  }
}
