import { browser, by, element } from 'protractor';
import { User } from 'src/app/models/user';

export class AppPage {

  user: User = {
    "userId": 44,
      "userName": "nameless",
      "batch": {
          "batchNumber": 1,
          "batchLocation": "Morgantown"
      },
      "firstName": "Name",
      "lastName": "Name",
      "email": "email@address.com",
      "phoneNumber": "123 123 1234",
      "isDriver": true,
      "hAddress": "500 Yates St",
      "hCity": "Arlington",
      "hZip": 76010,
      "hState": "TX",
      "wAddress": null,
      "wCity": null,
      "wZip": null,
      "wState": null,
      "distance": 0.0,
      "duration": 0.0,
      "car": null,
      "active": false,
      "isAcceptingRides": false
  };

  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTestUser() {
    return this.user;
  }

  getTitleText() {
    return element(by.css('app-root .content span')).getText() as Promise<string>;
  }

  getLoginButton() {
    return element(by.id("home-page-login-btn"));
  }

  getLoginFormLoginButton() {
    return element(by.id("sign-in-btn"));
  }

  /*
  * nav buttons
  */
  getNavDriverButton() {
    return element(by.id("nav-driver-a"));
  }
  getNavDropDown() {
    return element(by.id("navbarDropdown"));
  }
  getNavProfileA() {
    return element(by.id("nav-profile-a"));
  }
  getNavLogoutA() {
    return element(by.id("logout-btn"));
  }

  /*
  * profile page elements
  */
  getProfileGroupedContactInfoBtn() {
    return element(by.id("grouped-contact-info-btn"));
  }
  getProfileGroupedLocationBtn() {
    return element(by.id("grouped-location-btn"));
  }
  getProfileGroupedMembershipBtn() {
    return element(by.id("grouped-membership-btn"));
  }
  getProfileGroupedCarInfoBtn() {
    return element(by.id("grouped-car-info-btn"));
  }

  /*
  * profile page - container elements
  */
  getProfileContainerTitle() {
    return element(by.id("profile-container-title"));
  }
  getProfileContainerSubmitButton() {
    return element(by.id("profile-container-submit-btn"));
  }

  navigateToProfile() {
    this.navigateTo();
    browser.driver.manage().window().setSize(1800,720);
    this.navigateTo();
    this.getLoginButton().click();
    element(by.id("login-form-username-input")).sendKeys(this.user.userName);
    this.getLoginFormLoginButton().click();
    browser.sleep(1000);
    this.getNavDropDown().click();
    browser.waitForAngularEnabled(false);
    this.getNavProfileA().click();
  }
}
