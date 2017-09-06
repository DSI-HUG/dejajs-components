/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { browser, by, element, ExpectedConditions } from 'protractor';

export class AccordionPage {
    navigateTo() {
        browser.get('/accordion');
        // return element(by.css('deja-sidenav-menu md-list-item[routerlink="/components"]')).click();
    }

    headerIsOpen(body) {
         return body.getCssValue('max-height').then((value) => {
            return value !== '0px';
         });
    }

    headerIsOpenAfterAnimation(body) {
        return browser.wait(ExpectedConditions.visibilityOf(body))
        .then(() => {
            return this.headerIsOpen(body);
        });
    }

    openHeader(header) {
        return header.click();
    }
}
