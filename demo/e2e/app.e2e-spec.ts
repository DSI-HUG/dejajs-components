import { DejajsComponentsDemoPage } from './app.po';

describe('dejajs-components-demo App', () => {
  let page: DejajsComponentsDemoPage;

  beforeEach(() => {
    page = new DejajsComponentsDemoPage ();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
