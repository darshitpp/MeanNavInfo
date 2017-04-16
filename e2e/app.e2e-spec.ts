import { MeanNavInfoPage } from './app.po';

describe('mean-nav-info App', function() {
  let page: MeanNavInfoPage;

  beforeEach(() => {
    page = new MeanNavInfoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
