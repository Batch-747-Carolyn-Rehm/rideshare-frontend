import { AppPage } from '../src/app.po';
import { browser, logging, element, by } from 'protractor';

describe('test contact information form', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  /*
  * tests to navigate the the profile page so that the tests can be conducted in the contact info view
  */
  it('login as user and navigate to profile landing page, profile container loaded', () => {
    page.navigateToProfile();
    expect(element(by.id("profile-container")).isPresent()).toBe(true);
  });

  it('contact information view loaded by default', () => {
    expect(page.getProfileContainerTitle().getText()).toEqual("Contact Information:");
  });

  /*
  * tests to confirm the form input fields actually loaded
  */
  it('confirm first name input loaded in view', () => {
    expect(element(by.id("f_name")).isPresent()).toBe(true);
  });

  it('confirm last name input loaded in view', () => {
    expect(element(by.id("l_name")).isPresent()).toBe(true);
  });

  it('confirm email input loaded in view', () => {
    expect(element(by.id("user_email")).isPresent()).toBe(true);
  });

  it('confirm phone input loaded in view', () => {
    expect(element(by.id("phone")).isPresent()).toBe(true);
  });

  it('confirm submit button loaded in view', () => {
    expect(page.getProfileContainerSubmitButton().isPresent()).toBe(true);
  });

  /*
  * tests to confirm data was pulled from db and ddisplayed
  */
  it('confirm users first name loaded in input', () => {
    expect(element(by.id("f_name")).getAttribute("value")).toBe(page.getTestUser().firstName);
  });

  it('confirm users last name loaded in input', () => {
    expect(element(by.id("l_name")).getAttribute("value")).toBe(page.getTestUser().lastName);
  });

  it('confirm users email loaded in input', () => {
    expect(element(by.id("user_email")).getAttribute("value")).toBe(page.getTestUser().email);
  });

  it('confirm users phone loaded in input', () => {
    expect(element(by.id("phone")).getAttribute("value")).toBe(page.getTestUser().phoneNumber);
  });

  /*
  * tests to asses user's ability to input data in the input fields
  */
  it('able to input data in first name input field', () => {
    element(by.id("f_name")).clear();
    element(by.id("f_name")).sendKeys("testFName");
    expect(element(by.id("f_name")).getAttribute("value")).toBe("testFName");
  });

  it('able to input data in last name input field', () => {
    element(by.id("l_name")).clear();
    element(by.id("l_name")).sendKeys("testLName");
    expect(element(by.id("l_name")).getAttribute("value")).toBe("testLName");
  });

  it('able to input data in email input field', () => {
    element(by.id("user_email")).clear();
    element(by.id("user_email")).sendKeys("test@email.com");
    expect(element(by.id("user_email")).getAttribute("value")).toBe("test@email.com");
  });

  it('able to input data in the phone input field', () => {
    element(by.id("phone")).clear();
    element(by.id("phone")).sendKeys("000 000 0000");
    expect(element(by.id("phone")).getAttribute("value")).toBe("000 000 0000");
  });

  /*
  * test to make sure data is NOT persisted if the submit butotn is NOT used
  */
  it('not submit data and rout away, rout back, changes not persisted', () => {
    page.getProfileGroupedLocationBtn().click();
    page.getProfileGroupedContactInfoBtn().click();
    expect(element(by.id("f_name")).getAttribute("value")).toBe(page.getTestUser().firstName);
    expect(element(by.id("l_name")).getAttribute("value")).toBe(page.getTestUser().lastName);
    expect(element(by.id("user_email")).getAttribute("value")).toBe(page.getTestUser().email);
    expect(element(by.id("phone")).getAttribute("value")).toBe(page.getTestUser().phoneNumber);
  });

  /*
  * tests to make sure data is persisted if the submit butotn is used
  */
  it('persisted - first name changes saved', () => {
    element(by.id("f_name")).clear();
    element(by.id("f_name")).sendKeys("testName");
    page.getProfileContainerSubmitButton().click();
    /*
    * this sleeps are so that the app has time to process the form submit
    */
    browser.sleep(500);
    page.getProfileGroupedLocationBtn().click();
    page.getProfileGroupedContactInfoBtn().click();
    expect(element(by.id("f_name")).getAttribute("value")).toBe("testName");
    element(by.id("f_name")).clear();
    element(by.id("f_name")).sendKeys(page.getTestUser().firstName);
    page.getProfileContainerSubmitButton().click();
    browser.sleep(500);
    expect(element(by.id("f_name")).getAttribute("value")).toBe(page.getTestUser().firstName);
  });

  it('persisted - last name changes saved', () => {
    element(by.id("l_name")).clear();
    element(by.id("l_name")).sendKeys("testLastName");
    page.getProfileContainerSubmitButton().click();
    /*
    * this sleeps are so that the app has time to process the form submit
    */
    browser.sleep(500);
    page.getProfileGroupedLocationBtn().click();
    page.getProfileGroupedContactInfoBtn().click();
    expect(element(by.id("l_name")).getAttribute("value")).toBe("testLastName");
    element(by.id("l_name")).clear();
    element(by.id("l_name")).sendKeys(page.getTestUser().lastName);
    page.getProfileContainerSubmitButton().click();
    browser.sleep(500);
    expect(element(by.id("l_name")).getAttribute("value")).toBe(page.getTestUser().lastName);
  });

  it('persisted - email changes saved', () => {
    element(by.id("user_email")).clear();
    element(by.id("user_email")).sendKeys("test@email.com");
    page.getProfileContainerSubmitButton().click();
    /*
    * this sleeps are so that the app has time to process the form submit
    */
    browser.sleep(500);
    page.getProfileGroupedLocationBtn().click();
    page.getProfileGroupedContactInfoBtn().click();
    expect(element(by.id("user_email")).getAttribute("value")).toBe("test@email.com");
    element(by.id("user_email")).clear();
    element(by.id("user_email")).sendKeys(page.getTestUser().email);
    page.getProfileContainerSubmitButton().click();
    browser.sleep(500);
    expect(element(by.id("user_email")).getAttribute("value")).toBe(page.getTestUser().email);
  });

  it('persisted - phone changes saved', () => {
    element(by.id("phone")).clear();
    element(by.id("phone")).sendKeys("5555555555");
    page.getProfileContainerSubmitButton().click();
    /*
    * this sleeps are so that the app has time to process the form submit
    */
    browser.sleep(500);
    page.getProfileGroupedLocationBtn().click();
    page.getProfileGroupedContactInfoBtn().click();
    expect(element(by.id("phone")).getAttribute("value")).toBe("5555555555");
    element(by.id("phone")).clear();
    element(by.id("phone")).sendKeys(page.getTestUser().phoneNumber);
    page.getProfileContainerSubmitButton().click();
    browser.sleep(500);
    expect(element(by.id("phone")).getAttribute("value")).toBe(page.getTestUser().phoneNumber);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});