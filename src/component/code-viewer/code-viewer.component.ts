/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { AfterViewChecked } from '@angular/core';
import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import * as Prism from 'prismjs';

/**
 * Experimental
 * Code viewer component for angular using PrismJs
 */
@Component({
    selector: 'deja-code-viewer',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './code-viewer.component.html',
    styleUrls: ['./code-viewer.component.scss']
})
export class DejaCodeViewerComponent implements AfterViewChecked {
    /** Language inside viewer @see http://prismjs.com/#languages-list - PrismJs documentation to know possibles values */
    @Input() public language: string;

    private initialised = false;

    /**
     * Re-init prismjs afterViewChecked.
     * It's a quick fix to bind this component in any cases.
     */
    public ngAfterViewChecked(): void {
        // console.log('ok');
        if (!this.initialised) {
            // console.warn('not initialised');
            Prism.highlightAll(false, () => {
                this.initialised = true;
            });
        }
    }
}
