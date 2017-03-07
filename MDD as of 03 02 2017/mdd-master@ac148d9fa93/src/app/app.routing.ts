/**
 * Created by irepela on 9/2/2016.
 */
import {RouterModule, Routes} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {PageChartMetricsComponent} from "./page-chart-metrics/components/page-chart-metrics.component";
import {PageMainMetricsComponent} from "./page-main-metrics/components/page-main-metrics.component";

const appRoutes: Routes = [
  {
    path: '',
    component: PageMainMetricsComponent,
  },
  {
    path: 'metric-charts/:id',
    component: PageChartMetricsComponent,
  }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
