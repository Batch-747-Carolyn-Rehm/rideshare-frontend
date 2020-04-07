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

//   /*
//   * tests to confirm the form input fields actually loaded
//   */
//   it('confirm make input loaded in view', () => {
//     expect(element(by.id("make")).isPresent()).toBe(true);
//   });

//   it('confirm model input loaded in view', () => {
//     expect(element(by.id("model")).isPresent()).toBe(true);
//   });

//   it('confirm color input loaded in view', () => {
//     expect(element(by.id("color")).isPresent()).toBe(true);
//   });

//   it('confirm year input loaded in view', () => {
//     expect(element(by.id("year")).isPresent()).toBe(true);
//   });

//   it('confirm number of seats select loaded in view', () => {
//     expect(element(by.id("Nrseats")).isPresent()).toBe(true);
//   });

//   it('confirm submit button loaded in view', () => {
//     expect(page.getProfileContainerSubmitButton().isPresent()).toBe(true);
//   });

//   /*
//   * tests to confirm data was pulled from db and ddisplayed
//   */
//   it('confirm correct car make is loaded from db', () => {
//     expect(element(by.id("make")).getAttribute("value")).toBe("Lotus");
//   });

//   it('confirm correct car model is loaded from db', () => {
//     expect(element(by.id("model")).getAttribute("value")).toBe("Esprit");
//   });

//   it('confirm correct car color is loaded from db', () => {
//     expect(element(by.id("color")).getAttribute("value")).toBe("Goldenrod");
//   });

//   it('confirm correct car year is loaded from db', () => {
//     expect(element(by.id("year")).getAttribute("value")).toBe("2002");
//   });

//   it('confirm correct number of car seats loaded from db', () => {
//     expect(element(by.id("Nrseats")).getAttribute("value")).toBe("1");
//   });

//   /*
//   * tests to asses user's ability to input data in the input fields
//   */
//   it('able to input data in car make input field', () => {
//     element(by.id("make")).clear();
//     element(by.id("make")).sendKeys("makeTest");
//     expect(element(by.id("make")).getAttribute("value")).toBe("makeTest");
//   });

//   it('able to input data in car model input field', () => {
//     element(by.id("model")).clear();
//     element(by.id("model")).sendKeys("modelTest");
//     expect(element(by.id("model")).getAttribute("value")).toBe("modelTest");
//   });

//   it('able to input data in car color input field', () => {
//     element(by.id("color")).clear();
//     element(by.id("color")).sendKeys("colorTest");
//     expect(element(by.id("color")).getAttribute("value")).toBe("colorTest");
//   });

//   it('able to input data in car year input field', () => {
//     element(by.id("year")).clear();
//     element(by.id("year")).sendKeys("1900");
//     expect(element(by.id("year")).getAttribute("value")).toBe("1900");
//   });

//   it('able to change number of car seats', () => {
//     element(by.id("Nrseats")).click();
//     element(by.id("Nrseats")).element(by.cssContainingText('option', '5')).click();
//     expect(element(by.id("Nrseats")).getAttribute("value")).toBe("5");
//   });

//   /*
//   * test to make sure data is NOT persisted if the submit butotn is NOT used
//   */
//  it('not submit data, rout away, rout back, changes not persisted', () => {
//   page.getProfileGroupedContactInfoBtn().click();
//   page.getProfileGroupedCarInfoBtn().click();
//   expect(element(by.id("make")).getAttribute("value")).toBe("Lotus");
//   expect(element(by.id("model")).getAttribute("value")).toBe("Esprit");
//   expect(element(by.id("color")).getAttribute("value")).toBe("Goldenrod");
//   expect(element(by.id("year")).getAttribute("value")).toBe("2002");
//   expect(element(by.id("Nrseats")).getAttribute("value")).toBe("1");
// });

//   /*
//   * tests to make sure data is persisted if the submit butotn is used
//   */
//   it('persisted - make changes saved', () => {
//     element(by.id("make")).clear();
//     element(by.id("make")).sendKeys("testMake");
//     page.getProfileContainerSubmitButton().click();
//     /*
//     * this sleeps are so that the app has time to process the form submit
//     */
//     browser.sleep(500);
//     page.getProfileGroupedContactInfoBtn().click();
//     page.getProfileGroupedCarInfoBtn().click();
//     expect(element(by.id("make")).getAttribute("value")).toBe("testMake");
//     element(by.id("make")).clear();
//     element(by.id("make")).sendKeys("Lotus");
//     page.getProfileContainerSubmitButton().click();
//     browser.sleep(500);
//     expect(element(by.id("make")).getAttribute("value")).toBe("Lotus");
//   });

//   it('persisted - model changes saved', () => {
//     element(by.id("model")).clear();
//     element(by.id("model")).sendKeys("testModel");
//     page.getProfileContainerSubmitButton().click();
//     /*
//     * this sleeps are so that the app has time to process the form submit
//     */
//     browser.sleep(500);
//     page.getProfileGroupedContactInfoBtn().click();
//     page.getProfileGroupedCarInfoBtn().click();
//     expect(element(by.id("model")).getAttribute("value")).toBe("testModel");
//     element(by.id("model")).clear();
//     element(by.id("model")).sendKeys("Esprit");
//     page.getProfileContainerSubmitButton().click();
//     browser.sleep(500);
//     expect(element(by.id("model")).getAttribute("value")).toBe("Esprit");
//   });

//   it('persisted - color changes saved', () => {
//     element(by.id("color")).clear();
//     element(by.id("color")).sendKeys("testColor");
//     page.getProfileContainerSubmitButton().click();
//     /*
//     * this sleeps are so that the app has time to process the form submit
//     */
//     browser.sleep(500);
//     page.getProfileGroupedContactInfoBtn().click();
//     page.getProfileGroupedCarInfoBtn().click();
//     expect(element(by.id("color")).getAttribute("value")).toBe("testColor");
//     element(by.id("color")).clear();
//     element(by.id("color")).sendKeys("Goldenrod");
//     page.getProfileContainerSubmitButton().click();
//     browser.sleep(500);
//     expect(element(by.id("color")).getAttribute("value")).toBe("Goldenrod");
//   });

//   it('persisted - year changes saved', () => {
//     element(by.id("year")).clear();
//     element(by.id("year")).sendKeys("1900");
//     page.getProfileContainerSubmitButton().click();
//     /*
//     * this sleeps are so that the app has time to process the form submit
//     */
//     browser.sleep(500);
//     page.getProfileGroupedContactInfoBtn().click();
//     page.getProfileGroupedCarInfoBtn().click();
//     expect(element(by.id("year")).getAttribute("value")).toBe("1900");
//     element(by.id("year")).clear();
//     element(by.id("year")).sendKeys("2002");
//     page.getProfileContainerSubmitButton().click();
//     browser.sleep(500);
//     expect(element(by.id("year")).getAttribute("value")).toBe("2002");
//   });
  
//   it('persisted - number of car seats change saved', () => {
//     element(by.id("Nrseats")).click();
//     element(by.id("Nrseats")).element(by.cssContainingText('option', '3')).click();
//     page.getProfileContainerSubmitButton().click();
//     /*
//     * these sleeps are so that the app has time to process the form submit
//     */
//     browser.sleep(500);
//     page.getProfileGroupedContactInfoBtn().click();
//     page.getProfileGroupedCarInfoBtn().click();
//     expect(element(by.id("Nrseats")).getAttribute("value")).toBe("3");
//     element(by.id("Nrseats")).click();
//     element(by.id("Nrseats")).element(by.cssContainingText('option', '1')).click();
//     page.getProfileContainerSubmitButton().click();
//     browser.sleep(500);
//     expect(element(by.id("Nrseats")).getAttribute("value")).toBe("1");
//   });
  

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});