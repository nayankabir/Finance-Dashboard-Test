/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PageChartMetricsService } from './page-chart-metrics.service';

describe('Service: PageChartMetrics', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PageChartMetricsService]
    });
  });

  it('should ...', inject([PageChartMetricsService], (service: PageChartMetricsService) => {
    expect(service).toBeTruthy();
  }));
});
