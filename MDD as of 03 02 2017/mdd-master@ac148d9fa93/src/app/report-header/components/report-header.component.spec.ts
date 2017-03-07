/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { addProviders, async, inject } from '@angular/core/testing';
import { ReportHeaderComponent } from './report-header.component';

class MockTestService {

}

describe('Component: ReportHeader', () => {

  beforeEach(function() {
    this.testService = new MockTestService();
  });

  it('should create an instance', () => {
    let component = new ReportHeaderComponent(this.testService);
    expect(component).toBeTruthy();
  });
});
