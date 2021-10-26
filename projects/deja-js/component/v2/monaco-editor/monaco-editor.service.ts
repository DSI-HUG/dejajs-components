/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
import { Injectable, NgZone } from '@angular/core';
import { IDisposable } from 'monaco-editor';
import { Observable, shareReplay, take } from 'rxjs';

import { EditorOptions, Language } from './options/editor-options.model';

export interface MonacoEditorModel {
    id?: string;
    modified?: unknown;
    original?: unknown;
    getValue?: () => string;
    setValue?: (value: string) => void;
    onDidChangeContent?: (f: () => void) => IDisposable;
}

export interface MonacoEditorControl extends IDisposable {
    setModel: (options: MonacoEditorModel) => void;
    getModel: () => MonacoEditorModel;
    trigger: (a: string, ation: string) => void;
    layout: () => void;
    updateOptions: (options: EditorOptions) => void;
}

export interface MonacoEditorApi {
    createModel: (value: string, language: Language) => MonacoEditorModel;
    create: (element: HTMLElement, options: EditorOptions) => MonacoEditorControl;
    createDiffEditor: (element: HTMLElement, options: EditorOptions) => MonacoEditorControl;
}

export interface MonacoApi {
    editor: MonacoEditorApi;
}

/**
 * Monaco Editor Service
 *
 * Service used by Monaco Editor Component to load only once instance of the Monaco Editor Library
 */
@Injectable({
    providedIn: 'root'
})
export class MonacoEditorService {
    public monacoApi$: Observable<MonacoApi>;
    /**
     * Constructor
     */
    public constructor(zone: NgZone) {
        this.monacoApi$ = new Observable<MonacoApi>(subscriber => {
            const wnd = window as unknown;
            type Require1 = ((keys: string[], f: () => void) => void);
            interface Require2 {
                config: (options: { paths: { vs: string } }) => void;
            }
            const monacoWindow = wnd as {
                // eslint-disable-next-line @typescript-eslint/naming-convention
                MONACOEDITOR_BASEPATH: string;
                monaco: MonacoApi;
                require: Require1 | Require2;
            };

            const baseElement = document.getElementsByTagName('base')[0] || {} as HTMLBaseElement;
            const baseHref = baseElement.href;
            const basePath = monacoWindow.MONACOEDITOR_BASEPATH || `${baseHref}assets/monaco/vs`;

            const onGotAmdLoader = (): void => {
                // Load monaco
                (monacoWindow.require as Require2).config({ paths: { vs: basePath } });
                (monacoWindow.require as Require1)(['vs/editor/editor.main'], () => {
                    zone.run(() => {
                        subscriber.next(monacoWindow.monaco);
                    });
                });
            };

            // Load AMD loader if necessary
            if (!monacoWindow.require && !monacoWindow.monaco) {
                const loaderScript = document.createElement('script');
                loaderScript.type = 'text/javascript';
                loaderScript.src = `${basePath}/loader.js`;
                loaderScript.addEventListener('load', onGotAmdLoader);
                document.body.appendChild(loaderScript);
            } else {
                onGotAmdLoader();
            }
        }).pipe(
            take(1),
            shareReplay({ bufferSize: 1, refCount: false })
        );
    }
}
