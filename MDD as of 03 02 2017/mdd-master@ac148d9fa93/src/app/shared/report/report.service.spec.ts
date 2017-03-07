/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { ReportService } from './report.service';

describe('Service: Report', () => {
  beforeEach(() => {
    addProviders([ReportService]);
  });

  it('should ...',
    inject([ReportService],
      (service: ReportService) => {
        expect(service).toBeTruthy();
      }));
});
