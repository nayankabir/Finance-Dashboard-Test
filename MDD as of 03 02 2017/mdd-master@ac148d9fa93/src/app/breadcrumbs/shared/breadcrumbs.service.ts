import {Injectable} from '@angular/core';
import {BreadcrumbsConstant} from "../constants/breadcrumbs.constant";

@Injectable()
export class BreadcrumbsService {

  constructor() {
  }

  setBreadCrumbs(reportID, breadCrumbs) {
    let allBreadCrumbs = sessionStorage.getItem('breadCrumbs') ? JSON.parse(sessionStorage.getItem('breadCrumbs')) : {};
    breadCrumbs = breadCrumbs.filter(function (item) {
      return item.text !== BreadcrumbsConstant.OVERVIEW;
    });
    allBreadCrumbs[reportID] = breadCrumbs;
    sessionStorage.setItem('breadCrumbs', JSON.stringify(allBreadCrumbs));
  }

  getBreadCrumbs(reportId) {
    let allBreadCrumbs = sessionStorage.getItem('breadCrumbs') ? JSON.parse(sessionStorage.getItem('breadCrumbs')) : {};
    let breadCrumbs = allBreadCrumbs[reportId] || [];
    breadCrumbs.unshift({text: BreadcrumbsConstant.OVERVIEW, index: 0});
    return breadCrumbs;
  }
}
