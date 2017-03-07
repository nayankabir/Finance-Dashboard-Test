/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { PageMainMetricsService } from './page-main-metrics.service';

describe('Service: PageMainMetrics', () => {
  beforeEach(() => {
    addProviders([PageMainMetricsService]);
  });

  it('should ...',
    inject([PageMainMetricsService],
      (service: PageMainMetricsService) => {
        expect(service).toBeTruthy();
      }));
});
