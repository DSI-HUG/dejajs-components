/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Injectable } from '@angular/core';

/**
 * Monaco Editor Service
 *
 * Service used by Monaco Editor Component to load only once instance of the Monaco Editor Library
 */
@Injectable()
export class DejaEditorService {

    private _loading: boolean;
    private _loader: Promise<unknown>;

    /**
     * Load the CKEditor Editor Library
     *
     * @return Resolved promise when the library is loaded
     */
    public initDejaEditorLib(): Promise<unknown> {
        if (!this._loading) {
            this.init();
        }

        return this._loader;
    }

    private init(): void {
        this._loader = new Promise(resolve => {
            this._loading = true;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
            const wnd = <any>window;

            // Load AMD loader if necessary
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            if (!wnd.ckeditor) {
                const baseElement = document.getElementsByTagName('base')[0] || {} as HTMLBaseElement;
                const baseHref = baseElement.href;
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                const basePath = wnd.CKEDITOR_BASEPATH || `${baseHref}assets/ckeditor/`;
                const loaderScript = document.createElement('script');
                document.head.appendChild(loaderScript);
                loaderScript.type = 'text/javascript';
                loaderScript.src = `${basePath as string}ckeditor.js`;
                loaderScript.addEventListener('load', resolve);
            }
        });
    }
}
