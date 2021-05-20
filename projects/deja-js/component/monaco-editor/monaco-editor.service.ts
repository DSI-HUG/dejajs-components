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
export class MonacoEditorService {

    private _loading: boolean;
    private _loader: Promise<void>;

    /**
     * Load the Monaco Editor Library
     *
     * @return Resolved promise when the library is loaded
     */
    public initMonacoLib(): Promise<void> {
        if (!this._loading) {
            this.init();
        }

        return this._loader;
    }

    private init() {
        this._loader = new Promise<void>(resolve => {
            this._loading = true;
            const baseElement = document.getElementsByTagName('base')[0] || {} as HTMLBaseElement;
            const baseHref = baseElement.href;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const wnd = <any>window;
            const basePath = wnd.MONACOEDITOR_BASEPATH || `${baseHref}assets/monaco/vs`;

            const onGotAmdLoader = () => {
                // Load monaco
                wnd.require.config({ paths: { vs: basePath } });
                wnd.require(['vs/editor/editor.main'], () => {
                    resolve();
                });
            };

            // Load AMD loader if necessary
            if (!wnd.require && !wnd.monaco) {
                const loaderScript = document.createElement('script');
                loaderScript.type = 'text/javascript';
                loaderScript.src = `${basePath}/loader.js`;
                loaderScript.addEventListener('load', onGotAmdLoader);
                document.body.appendChild(loaderScript);
            } else {
                onGotAmdLoader();
            }
        });
    }
}
