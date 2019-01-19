import { browser } from 'protractor';
import { AppPage } from './app.po';

describe('angular-ssr-example App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    browser.pause();
    expect(page.getParagraphText()).toEqual('Our Contacts');
  });
});
// describe('Protractor Demo App', function() {
//   it('should have a title', function() {
//     browser.get('http://juliemr.github.io/protractor-demo/');

//     expect(browser.getTitle()).toEqual('Super Calculator');
//   });
// });
