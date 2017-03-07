import {Component, OnInit, OnDestroy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Store} from "@ngrx/store";
import {Card} from "../../report-cards/model/card";
import {PageChartMetricsService} from "../shared/page-chart-metrics.service";
import {ReportCardsActions} from "../../report-cards/actions/report-cards-actions";

@Component({
  selector: 'app-page-chart-metrics',
  templateUrl: 'page-chart-metrics.component.html',
  styleUrls: ['page-chart-metrics.component.scss'],
  providers: [PageChartMetricsService]
})
export class PageChartMetricsComponent implements OnInit, OnDestroy {

  //TODO: remove hard code when server data is ready
  private negativeStackChart = {"title": "TOP & BOTTOM QUARTILES"};
  private subscription;

  //TODO: remove hard code when server data is ready
  private waterfallCharts = [
    {"title": "BY DIVISION"},
    {"title": "BY SEASONALITY"},
    {"title": "BY PRODUCT PROFILE"},
    {"title": "BY CONSUMER ROLE"}
  ];

  constructor(private store: Store<any>, private route: ActivatedRoute,
              private metricChartsService: PageChartMetricsService) {
    this.subscription = this.store
      .select('reportCard')
      .subscribe((card: Card) => {
        if (!card) {
          let id = this.route.snapshot.params['id'];
          let currentCard: Card = this.metricChartsService.getMetricById(id);
          this.store.dispatch(ReportCardsActions.addBreadcrumb({"text": currentCard.name, "active": true}));
        }
      });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
