import { AppPage } from '../src/app.po';
import { browser, logging, element, by } from 'protractor';

describe('test landing page login form', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  /*
  * need this here so that the first test does not start before actually reaching the landing page
  */
  browser.get(browser.baseUrl);

  it('get login button', () => {
    page.navigateTo();
    expect(page.getLoginButton().getText()).toEqual('Login');
  });

  it('click login button, open login form', () =>{
    page.navigateTo();
    page.getLoginButton().click();
    expect(element(by.id("login-modal-modal-title")).getText()).toEqual('Login');
  });

  it('able to login as user', () => {
    element(by.id("login-form-username-input")).sendKeys(page.getTestUser().userName);
    page.getLoginFormLoginButton().click();
    browser.sleep(4000);
    browser.waitForAngularEnabled(false);
    expect(element(by.xpath('/html/body/app-root/app-driver-list/div/div/div[1]/h4')).getText()).toBe("Driver's List");
    browser.waitForAngularEnabled(true);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});