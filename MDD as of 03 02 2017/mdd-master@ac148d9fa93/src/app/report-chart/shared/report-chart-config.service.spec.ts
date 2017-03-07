/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { ReportChartConfigService } from './report-chart-config.service';

describe('Service: ReportChartConfig', () => {
  beforeEach(() => {
    addProviders([ReportChartConfigService]);
  });

  it('should ...',
    inject([ReportChartConfigService],
      (service: ReportChartConfigService) => {
        expect(service).toBeTruthy();
      }));
});
