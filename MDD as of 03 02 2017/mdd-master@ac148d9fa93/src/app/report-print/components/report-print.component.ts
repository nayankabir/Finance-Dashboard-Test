import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-report-print',
  templateUrl: 'report-print.component.html',
  styleUrls: ['report-print.component.scss']
})
export class ReportPrintComponent implements OnInit {

  private printIconPath = require("../shared/print-icon.svg");

  constructor() {
  }

  ngOnInit() {
  }

  print() {
    window.print();
  }

}
