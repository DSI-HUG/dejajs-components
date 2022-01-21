/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Destroy } from '@deja-js/component/core';
import { debounceTime, Subject, takeUntil, tap } from 'rxjs';

import { IDisposable, MonacoApi, MonacoEditorControl, MonacoEditorModel } from '../monaco-editor.service';
import { EditorOptions } from '../options/editor-options.model';

/**
 * Monaco Editor Component for Angular
 *
 * The Monaco Editor is the code editor that powers [VS Code](https://github.com/Microsoft/vscode), a good page describing the code editor's features is [here](https://code.visualstudio.com/docs/editor/editingevolved).
 */
@Component({
    selector: 'monaco-editor-control',
    styleUrls: [
        './monaco-editor-control.component.scss'
    ],
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MonacoEditorControlComponent extends Destroy implements OnInit {
    @Output() public readonly valueChange = new EventEmitter<string>();

    @Input()
    public set options(value: EditorOptions) {
        if (JSON.stringify(this._options) !== JSON.stringify(value)) {
            this._options = value;
            if (this.editor) {
                this.editor.updateOptions(this.options);
            }
        }
    }

    public get options(): EditorOptions {
        return this._options;
    }

    @Input()
    public set isDiffEditor(value: BooleanInput) {
        if (this._isDiffEditor !== value) {
            this._isDiffEditor = coerceBooleanProperty(value);
            this.createEditor$.next();
        }
    }

    public get isDiffEditor(): BooleanInput {
        return this._isDiffEditor;
    }

    @Input()
    public set editableValue(value: string) {
        if (this._editableValue !== value) {
            this._editableValue = value;
            const editableModel = this.editableModel;
            if (editableModel) {
                editableModel.setValue(this.editableValue);
            }
        }
    }

    public get editableValue(): string {
        return this._editableValue || '';
    }

    @Input()
    public set readOnlyValue(value: string) {
        if (this._readOnlyValue !== value) {
            this._readOnlyValue = value;
            const readOnlyModel = this.readOnlyModel;
            if (readOnlyModel) {
                readOnlyModel.setValue(this.readOnlyValue);
            }
        }
    }

    public get readOnlyValue(): string {
        return this._readOnlyValue || '';
    }

    @Input()
    public set monacoEditorApi(value: MonacoApi) {
        if (this._monacoEditorApi !== value) {
            this._monacoEditorApi = value;
            this.createEditor$.next();
        }
    }

    public get monacoEditorApi(): MonacoApi {
        return this._monacoEditorApi;
    }

    public editableModelSub: IDisposable;
    private editor: MonacoEditorControl;
    private _editableValue: string;
    private _readOnlyValue: string;
    private _isDiffEditor: boolean;
    private _options: EditorOptions;
    private _monacoEditorApi: MonacoApi;

    private createEditor$ = new Subject<void>();

    private get editableModel(): MonacoEditorModel {
        const model = this.editor?.getModel();
        return model?.id ? model : model?.modified;
    }

    private get readOnlyModel(): MonacoEditorModel {
        const model = this.editor?.getModel();
        return model?.id ? undefined : model?.original;
    }

    public constructor(
        private elementRef: ElementRef<HTMLElement>
    ) {
        super();

        console.log('MonacoEditorControlComponent constructor');

        this.createEditor$.pipe(
            tap(() => {
                this.editor = null;
            }),
            debounceTime(100),
            takeUntil(this.destroyed$)
        ).subscribe(() => {
            const element = this.elementRef.nativeElement;

            const setElementSize = (): void => {
                element.setAttribute('style', `height: ${element.parentElement.offsetHeight}px; width:100%;`);
            };

            this.clearElement();
            this.editor = this.isDiffEditor ? this.monacoEditorApi.editor.createDiffEditor(element, this.options) : this.monacoEditorApi.editor.create(element, this.options);
            setElementSize();

            const editableModel = this.monacoEditorApi.editor.createModel(this.editableValue, this.options.language);

            if (this.isDiffEditor) {
                const readOnlyModel = this.monacoEditorApi.editor.createModel(this.readOnlyValue, this.options.language);
                this.editor.setModel({
                    modified: editableModel,
                    original: readOnlyModel
                });
            } else {
                this.editor.setModel(editableModel);
            }

            if (this.editableModelSub) {
                this.editableModelSub.dispose();
                delete this.editableModelSub;
            }

            this.editableModelSub = editableModel.onDidChangeContent(() => {
                const v = this.editableModel.getValue();
                this._editableValue = v;
                this.valueChange.emit(v);
            });
        });

        this.destroyed$.pipe(
            // eslint-disable-next-line rxjs-angular/prefer-takeuntil
        ).subscribe(() => {
            if (this.editor) {
                this.editor.dispose();
            }
            this.clearElement();
            if (this.editableModelSub) {
                this.editableModelSub.dispose();
            }
        });
    }

    @HostListener('window:resize', [])
    public onResize(): void {
        // Manually set monaco size because MonacoEditor doesn't work with Flexbox css
        const myDiv = this.elementRef.nativeElement.firstChild as HTMLDivElement;
        myDiv.setAttribute('style', 'height: 100%; width: 100%;');
        if (this.editor) {
            this.editor.layout();
        }
    }

    public ngOnInit(): void {
        this.createEditor$.next();
    }

    private clearElement(): void {
        const element = this.elementRef.nativeElement;
        // eslint-disable-next-line no-loops/no-loops
        while (element.hasChildNodes()) {
            element.removeChild(element.firstChild);
        }
    }
}
