/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Injectable, OnDestroy } from '@angular/core';

@Injectable()
export class DejaDropDownContainerService implements OnDestroy {
    private _containerElement: HTMLElement;

    private _themeClass: string;

    public get themeClass() {
        return this._themeClass;
    }

    public set themeClass(value: string) {
        if (this._containerElement) {
            if (this._themeClass) {
                this._containerElement.classList.remove(this._themeClass);
            }

            if (value) {
                this._containerElement.classList.add(value);
            }
        }

        this._themeClass = value;
    }

    public get containerElement() {
        if (!this._containerElement) {
            this._containerElement = document.createElement('div');
            this._containerElement.classList.add('deja-dropdown-container');

            if (this._themeClass) {
                this._containerElement.classList.add(this._themeClass);
            }

            document.body.appendChild(this._containerElement);
        }
        return this._containerElement;
    }

    public ngOnDestroy() {
        if (this._containerElement && this._containerElement.parentNode) {
            this._containerElement.parentNode.removeChild(this._containerElement);
        }
    }
}
