import {ActionReducer, Action} from "@ngrx/store";
import {BreadcrumbsConstant} from "../constants/breadcrumbs.constant";
import {Breadcrumb} from "../model/breadcrumb";
/**
 * Created by irepela on 8/26/2016.
 */
export const breadcrumb: ActionReducer<Array<Breadcrumb>> = (state: Array<Breadcrumb> = [], action: Action) => {
  switch (action.type) {
    case BreadcrumbsConstant.ADD_BREADCRUMB:
      let length = state.length;
      if (length) {
        state[length - 1].active = false;
      }
      return [...state, action.payload];
    case BreadcrumbsConstant.BREADCRUMB_CLICK:
      let newState = state.slice(0, action.payload.index + 1);
      let newLength = newState.length;
      if (newLength) {
        newState[newLength - 1].active = true;
      }
      return newState;
    default:
      return state;
  }
}
