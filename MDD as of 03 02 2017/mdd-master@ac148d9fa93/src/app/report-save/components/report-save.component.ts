import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-report-save',
  templateUrl: 'report-save.component.html'
})
export class ReportSaveComponent implements OnInit {

  private saveIconPath = require("../shared/save-icon.png");

  constructor() {
  }

  ngOnInit() {
  }

  save() {
  }
}
