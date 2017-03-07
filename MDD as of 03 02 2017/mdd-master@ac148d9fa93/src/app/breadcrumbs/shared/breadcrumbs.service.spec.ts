/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { BreadcrumbsService } from './breadcrumbs.service';

describe('Service: Breadcrumbs', () => {
  beforeEach(() => {
    addProviders([BreadcrumbsService]);
  });

  it('should ...',
    inject([BreadcrumbsService],
      (service: BreadcrumbsService) => {
        expect(service).toBeTruthy();
      }));
});
