import { AppPage } from '../src/app.po';
import { browser, logging, by, element } from 'protractor';

describe('navigation tests', function() {
    let page: AppPage;
    let profilebuttonname = element(by.id('driverbuttontext'));
    let driverbuttonclicker = element(by.id('navbarDropdown'));
    let profilebuttonclicker = element(by.id('nav-profile-a'));

    beforeEach(() => {
      page = new AppPage();
    });

    it('has the users name at top right', function() {
      browser.driver.manage().window().setSize(1800,720);
      browser.waitForAngularEnabled(false);
      expect(profilebuttonname.getText()).toEqual('Name Name');
    });

    it('user can navigate to profiles via revature logo', function() {
      element(by.className("imageLogo")).click();
      expect(element(by.id('profile-container-title')).getText()).toBe('Contact Information:');
    });

    it('user can navigate to drivers page', function() {
      page.getNavDriverButton().click();
      expect(element(by.xpath('/html/body/app-root/app-driver-list/div/div/div[1]/h4')).getText()).toBe("Driver's List");
    });

    it('user can click on profile button', function() {
        driverbuttonclicker.click();
        profilebuttonclicker.click();
        expect(element(by.id('profile-container-title')).getText()).toBe('Contact Information:');
    });

    it('user can logout', function() {
      browser.sleep(1000);
      page.getNavDropDown().click();
      page.getNavLogoutA().click();
      expect(element(by.id("home-page-title")).getText()).toBe("RideForce");
  });

    afterEach(async () => {
        // Assert that there are no errors emitted from the browser
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        expect(logs).not.toContain(jasmine.objectContaining({
          level: logging.Level.SEVERE,
        } as logging.Entry));
      });
});