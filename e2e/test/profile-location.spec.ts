import { AppPage } from '../src/app.po';
import { browser, logging, element, by, protractor } from 'protractor';

describe('test location form', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  /*
  * tests to navigate the the profile page so that the tests can be conducted in the location form
  */
  it('login as user and navigate to profile landing page, click location, location container loaded', () => {
    browser.waitForAngularEnabled(false);
    page.navigateToProfile();
    expect(element(by.id("profile-container")).isPresent()).toBe(true);
    page.getProfileGroupedLocationBtn().click();
    expect(page.getProfileContainerTitle().getText()).toEqual("Location:");
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
    expect(element(by.id("address")).getAttribute("value")).toBe(page.getTestUser().hAddress);
  });

  it('confirm correct address 2 is loaded from db', () => {
    expect(element(by.id("address2")).getAttribute("value")).toBe('');
  });

  it('confirm correct city is loaded from db', () => {
    expect(element(by.id("city")).getAttribute("value")).toBe(page.getTestUser().hCity);
  });

  it('confirm correct state loaded from db', () => {
    expect(element(by.id("state")).getAttribute("value")).toBe(page.getTestUser().hState);
  });

  it('confirm correct zipcode is loaded from db', () => {
    expect(element(by.id("zipcode")).getAttribute("value")).toBe(`${page.getTestUser().hZip}`);
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
  expect(element(by.id("address")).getAttribute("value")).toBe(page.getTestUser().hAddress);
  expect(element(by.id("address2")).getAttribute("value")).toBe('');
  expect(element(by.id("city")).getAttribute("value")).toBe(page.getTestUser().hCity);
  expect(element(by.id("state")).getAttribute("value")).toBe(page.getTestUser().hState);
  expect(element(by.id("zipcode")).getAttribute("value")).toBe(`${page.getTestUser().hZip}`);
});

 /*
  * tests to make sure data is persisted if the submit butotn is used
  */
 it('persisted - adress changes saved', () => {
  element(by.id("address")).clear();
  element(by.id("address")).sendKeys("501 Yates St");
  page.getProfileContainerSubmitButton().click();
  /*
  * this sleeps are so that the app has time to process the form submit
  */
  browser.sleep(500);
  page.getProfileGroupedContactInfoBtn().click();
  page.getProfileGroupedLocationBtn().click();
  expect(element(by.id("address")).getAttribute("value")).toBe("501 Yates St");
  element(by.id("address")).clear();
  element(by.id("address")).sendKeys(page.getTestUser().hAddress);
  page.getProfileContainerSubmitButton().click();
  browser.sleep(500);
  expect(element(by.id("address")).getAttribute("value")).toBe(page.getTestUser().hAddress);
});

 it('persisted - adress2 changes saved', () => {
  element(by.id("address2")).clear();
  element(by.id("address2")).sendKeys("501 Yates St");
  page.getProfileContainerSubmitButton().click();
  /*
  * this sleeps are so that the app has time to process the form submit
  */
  browser.sleep(500);
  page.getProfileGroupedContactInfoBtn().click();
  page.getProfileGroupedLocationBtn().click();
  expect(element(by.id("address2")).getAttribute("value")).toBe("501 Yates St");
  element(by.id("address2")).sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'a'));
  element(by.id("address2")).sendKeys(protractor.Key.DELETE);
  page.getProfileContainerSubmitButton().click();
  browser.sleep(500);
  page.getProfileGroupedContactInfoBtn().click();
  page.getProfileGroupedLocationBtn().click();
  expect(element(by.id("address2")).getAttribute("value")).toBe('');
});

it('persisted - city changes saved', () => {
  element(by.id("city")).clear();
  element(by.id("city")).sendKeys("Dallas");
  page.getProfileContainerSubmitButton().click();
  /*
  * this sleeps are so that the app has time to process the form submit
  */
  browser.sleep(500);
  page.getProfileGroupedContactInfoBtn().click();
  page.getProfileGroupedLocationBtn().click();
  expect(element(by.id("city")).getAttribute("value")).toBe("Dallas");
  element(by.id("city")).clear();
  element(by.id("city")).sendKeys(page.getTestUser().hCity);
  page.getProfileContainerSubmitButton().click();
  browser.sleep(500);
  expect(element(by.id("city")).getAttribute("value")).toBe(page.getTestUser().hCity);
});

/*
* had to change multiple fields so that the address was valid
*/
it('persisted - state changes saved', () => {
  element(by.id("address")).clear();
  element(by.id("address")).sendKeys("11730 Plaza America Dr.");
  element(by.id("city")).clear();
  element(by.id("city")).sendKeys("Reston");
  element(by.id("state")).click();
  element(by.id("state")).element(by.cssContainingText('option', 'Virginia')).click();
  element(by.id("zipcode")).clear();
  element(by.id("zipcode")).sendKeys("20190");
  page.getProfileContainerSubmitButton().click();
  /*
  * these sleeps are so that the app has time to process the form submit
  */
  browser.sleep(500);
  page.getProfileGroupedContactInfoBtn().click();
  page.getProfileGroupedLocationBtn().click();
  expect(element(by.id("address")).getAttribute("value")).toBe("11730 Plaza America Dr.");
  expect(element(by.id("city")).getAttribute("value")).toBe("Reston");
  expect(element(by.id("state")).getAttribute("value")).toBe("VA");
  expect(element(by.id("zipcode")).getAttribute("value")).toBe("20190");
  element(by.id("address")).clear();
  element(by.id("address")).sendKeys(page.getTestUser().hAddress);
  element(by.id("city")).clear();
  element(by.id("city")).sendKeys(page.getTestUser().hCity);
  element(by.id("state")).click();
  /*
  * this is hard coded, was not able to have it select by the option value, db stores acronym not name
  */
  element(by.id("state")).element(by.cssContainingText('option', 'Texas')).click();
  element(by.id("zipcode")).clear();
  element(by.id("zipcode")).sendKeys(page.getTestUser().hZip);
  page.getProfileContainerSubmitButton().click();
  browser.sleep(500);
  expect(element(by.id("address")).getAttribute("value")).toBe(page.getTestUser().hAddress);
  expect(element(by.id("city")).getAttribute("value")).toBe(page.getTestUser().hCity);
  expect(element(by.id("state")).getAttribute("value")).toBe(page.getTestUser().hState);
  expect(element(by.id("zipcode")).getAttribute("value")).toBe(`${page.getTestUser().hZip}`);
});

it('persisted - zip changes saved', () => {
  element(by.id("zipcode")).clear();
  element(by.id("zipcode")).sendKeys("76010-");
  page.getProfileContainerSubmitButton().click();
  /*
  * this sleeps are so that the app has time to process the form submit
  */
  browser.sleep(500);
  page.getProfileGroupedContactInfoBtn().click();
  page.getProfileGroupedLocationBtn().click();
  expect(element(by.id("zipcode")).getAttribute("value")).toBe("76010-");
  element(by.id("zipcode")).clear();
  element(by.id("zipcode")).sendKeys(page.getTestUser().hZip);
  page.getProfileContainerSubmitButton().click();
  browser.sleep(500);
  expect(element(by.id("zipcode")).getAttribute("value")).toBe(`${page.getTestUser().hZip}`);
});

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});