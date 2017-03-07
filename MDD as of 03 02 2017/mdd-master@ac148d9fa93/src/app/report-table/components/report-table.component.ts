import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {EventConstants} from "../../shared/events/event-constants";

@Component({
  selector: 'app-report-table',
  templateUrl: 'report-table.component.html',
  styleUrls: ['report-table.component.scss']
})
export class ReportTableComponent {

  @Input()
  private tableData;
  @Input()
  private drillData;
  @Output()
  private onDataUpdate: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }

  updateData(ctxObj) {
    this.onDataUpdate.emit(ctxObj);
  }

}
