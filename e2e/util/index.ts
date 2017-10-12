/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { browser, by, ProtractorBy } from 'protractor';

export class Util {

    public static init(): void {
        browser.waitForAngularEnabled(false);
    }

    /**
     * Waits for an element to be rendered.
     */
    public static waitForElement(selector: string) {
        return browser.isElementPresent(by.css(selector) as ProtractorBy);
    }

}
