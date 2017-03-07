import { CtcDashboardPage } from './app.po';

describe('ctc-dashboard App', function() {
  let page: CtcDashboardPage;

  beforeEach(() => {
    page = new CtcDashboardPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
