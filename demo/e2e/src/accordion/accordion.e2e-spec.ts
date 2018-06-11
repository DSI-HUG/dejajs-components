/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { browser } from 'protractor';
// import { AccordionPage } from './accordion.po';

describe('Accordion component', () => {
    // let page: AccordionPage;

    beforeEach(() => {
        browser.ignoreSynchronization = true;
        // page = new AccordionPage();
    });

    // it('all accordion should be opening on click', async () => {
    //     page.navigateTo().then(() => {
    //         element.all(by.css('deja-accordion-group')).each((item) => {
    //             const header = item.element(by.css('deja-accordion-header'));
    //             const body = item.element(by.css('deja-accordion-body'));

    //             expect(page.headerIsOpen(body)).toBe(false);
    //             page.openHeader(header);
    //             page.headerIsOpenAfterAnimation(body).then((resp) => {
    //                 expect(resp).toBe(true);
    //             });
    //         });
    //     });

    // });
});
