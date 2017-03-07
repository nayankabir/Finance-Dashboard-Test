import {Action} from "@ngrx/store";
import {BreadcrumbsConstant} from "../constants/breadcrumbs.constant";
import {Breadcrumb} from "../model/breadcrumb";
export class BreadcrumbsActions {

  static breadcrumbClick(breadcrumb: Breadcrumb): Action {
    return {
      type: BreadcrumbsConstant.BREADCRUMB_CLICK,
      payload: breadcrumb
    };
  }

  static addBreadcrumb(breadcrumb: Breadcrumb): Action {
    return {
      type: BreadcrumbsConstant.ADD_BREADCRUMB,
      payload: breadcrumb
    };
  }
}
