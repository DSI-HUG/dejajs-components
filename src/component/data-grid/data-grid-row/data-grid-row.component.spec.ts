/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { TestBed, inject } from '@angular/core/testing';
import { DejaGridRowComponent } from './data-grid-row.component';

describe('a data-grid-row component', () => {
    let component: DejaGridRowComponent;

    // register all needed dependencies
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                DejaGridRowComponent
            ]
        });
    });

    // instantiation through framework injection
    beforeEach(inject([DejaGridRowComponent], (DejaGridRowComponent) => {
        component = DejaGridRowComponent;
    }));

    it('should have an instance', () => {
        expect(component).toBeDefined();
    });
});
