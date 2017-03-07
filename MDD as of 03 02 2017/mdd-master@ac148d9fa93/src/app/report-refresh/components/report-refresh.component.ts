import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-report-refresh',
  templateUrl: 'report-refresh.component.html',
  styleUrls: ['report-refresh.component.scss']
})
export class ReportRefreshComponent implements OnInit {

  private refreshIconPath = require("../shared/refresh-icon.svg");

  constructor() {
  }

  ngOnInit() {
  }

  refresh() {
    sessionStorage.removeItem("conversationID");
    window.location.reload();
  }

}
