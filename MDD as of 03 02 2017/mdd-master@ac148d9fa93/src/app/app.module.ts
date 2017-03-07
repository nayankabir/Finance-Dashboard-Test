import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ReportHeaderComponent } from './report-header/components/report-header.component';
import { ReportFilterComponent } from './report-filter/components/report-filter.component';
import {HttpModule} from "@angular/http";
import { ReportUserSettingsComponent } from './report-user-settings/components/report-user-settings.component';
import { ReportAuthComponent } from './report-auth/components/report-auth.component';
import {StoreModule} from "@ngrx/store";
import {header} from "./report-header/reducers/header";
import {breadcrumb} from "./breadcrumbs/reducers/breadcrumb";
import {reportCard} from "./report-cards/reducers/reportCard";
import {reportFilters} from "./report-filter/reducers/reportFilters";
import {pageMainMetrics} from "./page-main-metrics/reducers/pageMainMetrics";
import { ReportActionsComponent } from './report-actions/components/report-actions.component';
import { PageMainMetricsComponent } from './page-main-metrics/components/page-main-metrics.component';
import { PageChartMetricsComponent } from './page-chart-metrics/components/page-chart-metrics.component';
import {appRoutingProviders, routing} from "./app.routing";

@NgModule({
  declarations: [
    AppComponent,
    ReportHeaderComponent,
    ReportFilterComponent,
    ReportUserSettingsComponent,
    ReportAuthComponent,
    ReportActionsComponent,
    PageMainMetricsComponent,
    PageChartMetricsComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpModule,
    routing,
    StoreModule.provideStore({header, breadcrumb, reportCard, reportFilters, pageMainMetrics})
  ],
  providers: [appRoutingProviders],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {

}
