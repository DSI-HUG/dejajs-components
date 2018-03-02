/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { browser, by, element, ProtractorBy } from 'protractor';
import { SidenavPage } from './sidenav.po';

describe('dejajs-components-demo App', () => {
    let sidenav: SidenavPage;

    beforeEach(() => {
        browser.ignoreSynchronization = true;
        sidenav = new SidenavPage();
    });

    it('should be hidden on mobile', async () => {
        browser.driver.manage().window().setSize(375, 667).then(() => {
            sidenav.navigateTo().then(() => {
                browser.waitForAngular().then(() => {
                    browser.sleep(500); // Wait for animation
                    expect(element(by.css('deja-sidenav-menu')).isDisplayed()).toBe(false, 'Should be hidden');
                });
            });

        });
    });

    it('should be minimize on tablet', async () => {
        browser.driver.manage().window().setSize(640, 480).then(() => {
            sidenav.navigateTo().then(() => {
                browser.waitForAngular().then(() => {
                    browser.sleep(500); // Wait for animation
                    expect(element(by.css('deja-sidenav-menu')).isDisplayed()).toBe(true, 'Should be visible');
                    expect(element(by.css('deja-sidenav-menu mat-list-item.active .mat-list-text')).isDisplayed()).toBe(false, 'Should be minimize');
                });
            });
        });
    });

    it('should be open on desktop', async () => {
        browser.driver.manage().window().setSize(1250, 500).then(() => {
            sidenav.navigateTo().then(() => {
                browser.waitForAngular().then(() => {
                    browser.sleep(500); // Wait for animation
                    expect(element(by.css('deja-sidenav-menu mat-list-item.active .mat-list-text')).isDisplayed()).toBe(true, 'Should be open');
                });
            });
        });
    });

    it('should open on menu click', async () => {
        browser.driver.manage().window().setSize(1250, 500).then(() => {
            browser.waitForAngular().then(() => {
                browser.sleep(500); // Wait for animation
                expect(element(by.css('deja-sidenav-menu mat-list-item.active .mat-list-text')).isDisplayed()).toBe(true, 'Should be open by default');

                element(by.css('mat-sidenav .header-menu-btn')).click();
                browser.sleep(500); // Wait for animation
                expect(element(by.css('deja-sidenav-menu mat-list-item.active .mat-list-text')).isDisplayed()).toBe(false, 'Should be close');

                element(by.css('mat-sidenav .header-menu-btn')).click();
                browser.sleep(500); // Wait for animation
                expect(element(by.css('deja-sidenav-menu mat-list-item.active .mat-list-text')).isDisplayed()).toBe(true, 'Should be open');
            });
        });
    });
});
