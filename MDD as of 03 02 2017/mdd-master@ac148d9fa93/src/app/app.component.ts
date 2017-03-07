import {Component, OnInit, ViewEncapsulation, OnDestroy} from '@angular/core';
import {ReportHeaderComponent} from "./report-header/components/report-header.component";
import {ReportFilterComponent} from "./report-filter/components/report-filter.component";
import {ReportChartComponent} from "./report-chart/components/report-chart.component";
import {ReportService} from "./shared/report/report.service";
import {DataParseService} from "./shared/report/data/data-parse.service";
import {UserLoginService} from "./shared/login/user-login.service";
import {User} from "./report-header/model/user";
import {ReportFilterService} from "./report-filter/shared/report-filter.service";
import {Store} from "@ngrx/store";
//In order to run locally please create mashup.config.ts by copying mashup.dev.config.ts or other configs
import {REPORT_ID} from "./shared/mashup.config";
import {BreadcrumbsService} from "./breadcrumbs/shared/breadcrumbs.service";
import {BreadcrumbsConstant} from "./breadcrumbs/constants/breadcrumbs.constant";
import {Breadcrumb} from "./breadcrumbs/model/breadcrumb";
import {ReportFiltersActions} from "./report-filter/actions/report-filters-actions";
import {PageMainMetricsActions} from "./page-main-metrics/actions/page-main-metrics-actions";
import {FilterModel} from "./report-filter/model/filterModel";
import {MetricsModel} from "./page-main-metrics/model/metricsModel";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss', 'index.scss'],
  directives: [ReportHeaderComponent, ReportFilterComponent, ReportChartComponent],
  providers: [BreadcrumbsService, ReportService, DataParseService, UserLoginService, ReportFilterService],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, OnDestroy {

  private filtersLoading: boolean = true;
  private metricsLoading: boolean;
  private reportId: string = REPORT_ID;
  private filterDisplayed;
  private drillRequestInProgress: boolean;
  private loading: boolean;
  private showTable: boolean;
  private chartData;
  private filterData;
  private topFilters;
  private breadCrumbs;
  private errorMessage;
  private drillDefinition;
  private tableData;
  private reportTableId;
  private drillData;
  private user: User;
  private rootBreadcrumb: Breadcrumb = {
    "index": 0,
    "text": BreadcrumbsConstant.OVERVIEW,
    "active": true
  };
  private filtersSubscription;
  private metricsSubscription;

  constructor(private store:Store<any>,
              private breadcrumbsService: BreadcrumbsService,
              private reportService: ReportService,
              private dataParseService: DataParseService,
              private userLoginService: UserLoginService,
              private filterService: ReportFilterService) {

    this.filterDisplayed = store.select("header");

    this.filtersSubscription = this.store.select('reportFilters')
      .subscribe((filterModel: FilterModel) => {
        if (filterModel) {
          this.topFilters = filterModel.topFilters;
          this.filterData = filterModel.filtersData;
        }
      });

    this.metricsSubscription = this.store.select('pageMainMetrics')
      .subscribe((metricsModel: MetricsModel) => {
        if (metricsModel) {
          this.metricsLoading = !metricsModel.loaded;
        }
      });
  }

  ngOnInit() {
    sessionStorage.removeItem("conversationID");
    sessionStorage.removeItem("breadCrumbs");
    this.user = this.userLoginService.getMockUser();
    this.breadCrumbs = this.breadcrumbsService.getBreadCrumbs(this.reportId);
    this.filtersLoading = true;

    //In order to run app with connection to IBM Cognos please provide valid creds
    //this.userLoginService.doLogin("test", "test").subscribe(res => {
        this.initReportData();
    //});
  }

  ngOnDestroy() {
    this.filtersSubscription.unsubscribe();
    this.metricsSubscription.unsubscribe;
  }

  private initReportData() {
    if (this.breadCrumbs.length > 1) {
      this.goToTableView(false);
    } else {
      this.getFilterData();
    }
  }

  private getFilterData() {
    this.reportService.getReportData(this.reportId, false).subscribe(
      reportData => {
        this.filtersLoading = false;
        let filterModel = this.filterService.getFilterData(reportData);
        this.store.dispatch(ReportFiltersActions.filtersReady(filterModel));
        let filterParams = this.filterService.getParams(filterModel.topFilters);
        let selectedTimeFilter = this.filterService.getSelectedTimePeriod(filterModel.topFilters);
        this.store.dispatch(ReportFiltersActions.applyFilters({
          filterParams: filterParams,
          selectedTimeFilter: selectedTimeFilter,
          formatterId: filterModel.topFilters[0].selectedOption.use
        }));
        this.metricsLoading = true;
      },
      error => this.errorMessage = error
    );
  }

  updateTableData(data) {
    this.loading = true;
    if (this.drillRequestInProgress) {
      return;
    }
    this.drillRequestInProgress = true;
    this.reportService.doDrill(this.reportTableId, {ctxValue: data.ctx, usePath: true}).subscribe(response => {
      this.tableData = this.reportService.getTableData(response);
      this.drillData = this.reportService.getDrillData(response);
      this.breadCrumbs.push(data);
      this.breadcrumbsService.setBreadCrumbs(this.reportTableId, this.breadCrumbs);
      this.loading = false;
      this.drillRequestInProgress = false;
    });
  }

  drillUp(data) {
    if (this.drillRequestInProgress) {
      return;
    }
    this.drillRequestInProgress = true;
    this.loading = true;
    if (data.breadcrumb.text === BreadcrumbsConstant.OVERVIEW) {
      this.showTable = false;
      this.loading = false;
      this.chartData = null;
      this.breadCrumbs.length = 1;
      sessionStorage.removeItem('conversationID');
      this.breadcrumbsService.setBreadCrumbs(this.reportId, this.breadCrumbs);
      //this.getChartData();
      this.drillRequestInProgress = false;
    }
    this.doDrill(data, data.position);
  }

  doDrill(data, index) {
    this.reportService.doDrill(this.reportTableId, {ctxValue: data.ctx, direction: "UP"}).subscribe(response => {
      if (this.breadCrumbs.length - 1 === index) {
        this.breadCrumbs.length = index;
        this.tableData = this.reportService.getTableData(response);
        this.drillData = this.reportService.getDrillData(response);
        this.breadcrumbsService.setBreadCrumbs(this.reportTableId, this.breadCrumbs);
        this.loading = false;
        this.drillRequestInProgress = false;
      } else {
        this.breadCrumbs.length -= 1;
        this.doDrill(this.breadCrumbs[this.breadCrumbs.length - 1], index);
      }
    });
  }

  onFilterButtonsClick(data) {
    if (this.loading) {
      return;
    }
    this.loading = true;
    this.reportService.applyFilter(this.reportId, data).subscribe(function (response) {
      let chartData = this.reportService.getChartData(response);
      this.chartData = this.DataParseService.formatChartData(chartData);
      this.loading = false;
    });
  }

  goToTableView(fromChart) {
    if (fromChart) {
      sessionStorage.removeItem("conversationID");
    }
    //this.reportService.getReportID(this.drillDefinition[Object.keys(drillDefinition)[0]]).subscribe(reportData => {
    this.reportTableId = "i07D22035D6FB466A9B2E81EC61CFC5A8";
    if (this.breadCrumbs.length === 1) {
      this.tableData = null;
      this.drillData = null;
      this.loading = true;
    }
    this.reportService.getReportData(this.reportTableId, true).subscribe(
      reportData => {
        this.tableData = this.reportService.getTableData(reportData);
        this.drillData = this.reportService.getDrillData(reportData);
        if (!this.filterData) {
          this.filterService.getFilterData(reportData);
        }
        this.loading = false;
      });
    this.showTable = true;
    //});
  }
}
