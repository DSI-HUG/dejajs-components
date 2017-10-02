/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { browser, ExpectedConditions } from 'protractor';

export class AccordionPage {
    public navigateTo() {
        browser.get('/accordion');
        // return element(by.css('deja-sidenav-menu mat-list-item[routerlink="/components"]')).click();
    }

    public headerIsOpen(body) {
         return body.getCssValue('max-height').then((value) => {
            return value !== '0px';
         });
    }

    public headerIsOpenAfterAnimation(body) {
        return browser.wait(ExpectedConditions.visibilityOf(body))
        .then(() => {
            return this.headerIsOpen(body);
        });
    }

    public openHeader(header) {
        return header.click();
    }
}
