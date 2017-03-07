/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { ReportFilterService } from './report-filter.service';

describe('Service: ReportFilter', () => {
  beforeEach(() => {
    addProviders([ReportFilterService]);
  });

  it('should ...',
    inject([ReportFilterService],
      (service: ReportFilterService) => {
        expect(service).toBeTruthy();
      }));
});
