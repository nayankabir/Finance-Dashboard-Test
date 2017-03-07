import {Component, OnInit, Input} from '@angular/core';
import {Store} from "@ngrx/store";
import {BreadcrumbsActions} from "../actions/breadcrumbs-actions";
import {Router} from "@angular/router";

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: 'breadcrumbs.component.html',
  styleUrls: ['breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {

  private breadcrumbs;
  private active: boolean;
  @Input()
  private rootBreadcrumb;

  constructor(private router: Router, private store: Store<any>) {
    this.breadcrumbs = this.store.select("breadcrumb");
  }

  ngOnInit() {
    this.store.dispatch(BreadcrumbsActions.addBreadcrumb(this.rootBreadcrumb));
  }

  onBreadcrumbClick(breadcrumb, index) {
    breadcrumb.index = index;
    this.store.dispatch(BreadcrumbsActions.breadcrumbClick(breadcrumb));
    if (index === 0) {
      this.router.navigate(["/"]);
    }
  }

}
