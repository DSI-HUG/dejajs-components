import { Injectable } from '@angular/core';

@Injectable()
export class MonacoEditorService {

    private _loading: boolean;
    private _loader: Promise<any>;

    constructor() {

    }

    public initMonacoLib(monacoLibPath: string): Promise<any> {
        if (!this._loading) {
            this.init(monacoLibPath);
        }

        return this._loader;
    }

    private init(monacoLibPath: string) {
        this._loader = new Promise((resolve) => {
            this._loading = true;

            // Remove the last character if is a '/'
            if (monacoLibPath.substring(monacoLibPath.length - 1, monacoLibPath.length) === '/') {
                monacoLibPath = monacoLibPath.substring(0, monacoLibPath.length - 1);
            }

            const onGotAmdLoader = () => {
                // Load monaco
                (<any>window).require([monacoLibPath + '/editor/editor.main'], () => {
                    resolve();
                });
            };

            // Load AMD loader if necessary
            if (!(<any>window).require && !(<any>window).monaco) {
                const loaderScript = document.createElement('script');
                loaderScript.type = 'text/javascript';
                loaderScript.src = monacoLibPath + '/loader.js';
                loaderScript.addEventListener('load', onGotAmdLoader);
                document.body.appendChild(loaderScript);
            } else {
                onGotAmdLoader();
            }
        });
    }
}