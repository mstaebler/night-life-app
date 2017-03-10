import { NightLifeAppPage } from './app.po';

describe('night-life-app App', () => {
  let page: NightLifeAppPage;

  beforeEach(() => {
    page = new NightLifeAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
