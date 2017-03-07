import {Component, Input} from "@angular/core";
import {User} from "../model/user";
import {Store} from "@ngrx/store";
import {ReportHeaderActions} from "../actions/report-header-actions";


@Component({
  moduleId: module.id.toString(),
  selector: "app-report-header",
  templateUrl: "report-header.component.html",
  styleUrls: ["report-header.component.scss"]
})
export class ReportHeaderComponent {

  @Input()
  private user: User;
  private showFilters: boolean;

  private headerSpritePath = require("../shared/header-sprite.svg");

  constructor(private store: Store<any>) {
  }

  toggleFilter() {
    this.showFilters = !this.showFilters;
    this.store.dispatch(ReportHeaderActions.toggleFilter(this.showFilters));
  }
}
