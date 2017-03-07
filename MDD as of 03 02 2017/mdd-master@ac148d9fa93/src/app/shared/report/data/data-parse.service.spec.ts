/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { DataParseService } from './data-parse.service';

describe('Service: Data', () => {
  beforeEach(() => {
    addProviders([DataParseService]);
  });

  it('should ...',
    inject([DataParseService],
      (service: DataParseService) => {
        expect(service).toBeTruthy();
      }));
});
