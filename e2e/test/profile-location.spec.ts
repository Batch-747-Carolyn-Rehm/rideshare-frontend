import { AppPage } from '../src/app.po';
import { browser, logging, element, by } from 'protractor';

describe('test location form', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  /*
  * tests to navigate the the profile page so that the tests can be conducted in the location form
  */
  it('login as user and navigate to profile landing page, click location, location container loaded', () => {
    browser.driver.manage().window().setSize(1800,720);
    page.navigateTo();
    page.getLoginButton().click();
    element(by.id("login-form-username-input")).sendKeys("nameless");
    page.getLoginFormLoginButton().click();
    browser.sleep(2000);
    page.getNavDropDown().click();
    browser.waitForAngularEnabled(false);
    page.getNavProfileA().click();
    expect(element(by.id("profile-container")).isPresent()).toBe(true);
    page.getProfileGroupedLocationBtn().click();
    expect(page.getProfileContainerTitle().getText()).toEqual("Locationo:");
  });

  /*
  * tests to confirm the form input fields actually loaded
  */
  it('confirm address input loaded in view', () => {
    expect(element(by.id("address")).isPresent()).toBe(true);
  });

  it('confirm address 2 loaded in view', () => {
    expect(element(by.id("address2")).isPresent()).toBe(true);
  });

  it('confirm city input loaded in view', () => {
    expect(element(by.id("city")).isPresent()).toBe(true);
  });

  it('confirm state select loaded in view', () => {
    expect(element(by.id("state")).isPresent()).toBe(true);
  });

  it('confirm zipcode input loaded in view', () => {
    expect(element(by.id("zipcode")).isPresent()).toBe(true);
  });

  it('confirm submit button loaded in view', () => {
    expect(page.getProfileContainerSubmitButton().isPresent()).toBe(true);
  });

  /*
  * tests to confirm that correct data was pulled from db and displayed
  */
  it('confirm correct address is loaded from db', () => {
    expect(element(by.id("address")).getAttribute("value")).toBe("500 Yates St");
  });

  it('confirm correct address 2 is loaded from db', () => {
    expect(element(by.id("address2")).getAttribute("value")).toBe("");
  });

  it('confirm correct city is loaded from db', () => {
    expect(element(by.id("city")).getAttribute("value")).toBe("Arlington");
  });

  it('confirm correct state loaded from db', () => {
    expect(element(by.id("state")).getAttribute("value")).toBe("TX");
  });

  it('confirm correct zipcode is loaded from db', () => {
    expect(element(by.id("zipcode")).getAttribute("value")).toBe("76010");
  });

  /*
  * tests to asses user's ability to input data in the input fields
  */
  it('able to input data in address input field', () => {
    element(by.id("address")).clear();
    element(by.id("address")).sendKeys("addressTest");
    expect(element(by.id("address")).getAttribute("value")).toBe("addressTest");
  });

  it('able to input data in address2 input field', () => {
    element(by.id("address2")).clear();
    element(by.id("address2")).sendKeys("address2Test");
    expect(element(by.id("address2")).getAttribute("value")).toBe("address2Test");
  });

  it('able to input data in city input field', () => {
    element(by.id("city")).clear();
    element(by.id("city")).sendKeys("cityTest");
    expect(element(by.id("city")).getAttribute("value")).toBe("cityTest");
  });

  it('able to change state', () => {
    element(by.id("state")).click();
    element(by.id("state")).element(by.cssContainingText('option', 'Florida')).click();
    expect(element(by.id("state")).getAttribute("value")).toBe("FL");
  });

  it('able to input data in zipcode input field', () => {
    element(by.id("zipcode")).clear();
    element(by.id("zipcode")).sendKeys("12345");
    expect(element(by.id("zipcode")).getAttribute("value")).toBe("12345");
  });

  /*
  * test to make sure data is NOT persisted if the submit butotn is NOT used
  */
 it('not submit data, rout away, rout back, changes not persisted', () => {
  page.getProfileGroupedContactInfoBtn().click();
  page.getProfileGroupedLocationBtn().click();
  expect(element(by.id("address")).getAttribute("value")).toBe("500 Yates St");
  expect(element(by.id("address2")).getAttribute("value")).toBe("");
  expect(element(by.id("city")).getAttribute("value")).toBe("Arlington");
  expect(element(by.id("state")).getAttribute("value")).toBe("TX");
  expect(element(by.id("zipcode")).getAttribute("value")).toBe("76010");
});

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});