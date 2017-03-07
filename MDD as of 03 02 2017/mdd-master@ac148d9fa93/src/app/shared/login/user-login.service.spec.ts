/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { UserLoginService } from './user-login.service';

describe('Service: UserLogin', () => {
  beforeEach(() => {
    addProviders([UserLoginService]);
  });

  it('should ...',
    inject([UserLoginService],
      (service: UserLoginService) => {
        expect(service).toBeTruthy();
      }));
});
