import { ChouseikunPage } from './app.po';

describe('chouseikun App', function() {
  let page: ChouseikunPage;

  beforeEach(() => {
    page = new ChouseikunPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
