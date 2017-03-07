import {Component, OnInit, OnDestroy} from '@angular/core';
import {ReportCardsComponent} from "../../report-cards/components/report-cards.component";
import {BreadcrumbsComponent} from "../../breadcrumbs/components/breadcrumbs.component";
import {PageMainMetricsService} from "../shared/page-main-metrics.service";
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {Card} from "../../report-cards/model/card";
import {ReportCardsActions} from "../../report-cards/actions/report-cards-actions";
import {ReportService} from "../../shared/report/report.service";
import {PageMainMetricsActions} from "../actions/page-main-metrics-actions";
import {PageMainMetricConstant} from "../constants/page-main-metrics-constant";

@Component({
  selector: 'app-page-main-metrics',
  templateUrl: 'page-main-metrics.component.html',
  directives: [ReportCardsComponent, BreadcrumbsComponent],
  styleUrls: ['page-main-metrics.component.scss'],
  providers: [PageMainMetricsService]
})
export class PageMainMetricsComponent implements OnInit, OnDestroy {

  private rootBreadcrumb;
  private cards;
  private cardSubscription;
  private filterSubscription;
  private mainMetricsSubscription;
  private hasLeftOffset: boolean;
  private errorMessage;
  private selectedTimeFilter: string;
  private currencyFormatter: string;

  constructor(private metricsService: PageMainMetricsService,
              private store: Store<any>, private router: Router,
              private reportService: ReportService) {

    this.cardSubscription = this.store.select('reportCard')
      .subscribe((card: Card) => {
        if (card && card.showMetricDetails) {
          this.store.dispatch(ReportCardsActions.hideDetails(card));
          this.router.navigate(["/metric-charts", card.id]);
        }
      });

    this.filterSubscription = this.store.select('header')
      .subscribe((filterHidden: boolean) => {
       this.hasLeftOffset = !filterHidden;
      });

    this.mainMetricsSubscription = this.store.select('pageMainMetrics')
      .subscribe(filterObj => {
          this.getMetricCardsData(filterObj);
      });
  }

  private getMetricCardsData(filterObj) {
    if (filterObj && filterObj.filterParams && !filterObj.loaded) {
      this.selectedTimeFilter = filterObj.selectedTimeFilter;
      this.currencyFormatter = PageMainMetricConstant.getSelectedCurrencyFilter(filterObj.formatterId);
      this.reportService.getMetricCardsData(filterObj.filterParams, false).subscribe(
        metricsData => {
          this.store.dispatch(PageMainMetricsActions.metricsLoaded({loaded: true}));
          this.cards = this.metricsService.getMetricsData(metricsData, filterObj.selectedTimeFilter);
        },
        error => this.errorMessage = error
      );
    }
  }

  ngOnInit() {
    this.store.dispatch(PageMainMetricsActions.metricsLoaded({loaded: false}));
    this.rootBreadcrumb = this.metricsService.getRootBreadcrumb();
  }

  ngOnDestroy() {
    this.cardSubscription.unsubscribe();
    this.filterSubscription.unsubscribe();
    this.mainMetricsSubscription.unsubscribe();
  }

}
