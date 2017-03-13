import { Test3Page } from './app.po';

describe('test3 App', () => {
  let page: Test3Page;

  beforeEach(() => {
    page = new Test3Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
