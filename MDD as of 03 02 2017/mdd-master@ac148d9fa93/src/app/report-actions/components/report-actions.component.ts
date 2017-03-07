import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ReportSaveComponent} from "../../report-save/components/report-save.component";
import {ReportShareComponent} from "../../report-share/components/report-share.component";
import {ReportPrintComponent} from "../../report-print/components/report-print.component";
import {ReportRefreshComponent} from "../../report-refresh/components/report-refresh.component";

@Component({
  selector: 'app-report-actions',
  templateUrl: 'report-actions.component.html',
  styleUrls: ['report-actions.component.scss'],
  directives: [ReportSaveComponent, ReportShareComponent,
    ReportPrintComponent, ReportRefreshComponent],
  encapsulation: ViewEncapsulation.None
})
export class ReportActionsComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
