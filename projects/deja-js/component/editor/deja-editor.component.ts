/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { AfterViewInit } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Component } from '@angular/core';
import { ElementRef } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { forwardRef } from '@angular/core';
import { Input } from '@angular/core';
import { NgZone } from '@angular/core';
import { OnChanges } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Output } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Destroy } from '@deja-js/component/core';
import { cloneDeep } from 'lodash';
import { from, Subscription, timer } from 'rxjs';
import { delay, first, take, takeUntil, tap } from 'rxjs/operators';

import { DejaEditorService } from './deja-editor.service';

/// <reference path="@types/ckeditor/index.d.ts" />
// declare let CKEDITOR: unknown;

/**
 * CKEditor component
 * Usage :
 *  <ckeditor [(ngModel)]="data" [config]="{...}" debounce="500"></ckeditor>
 */
@Component({
    selector: 'deja-editor',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DejaEditorComponent),
            multi: true
        }
    ],
    templateUrl: './deja-editor.component.html',
    styleUrls: ['./deja-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class DejaEditorComponent extends Destroy implements OnChanges, AfterViewInit, OnDestroy, ControlValueAccessor {
    @Input() public config: any;
    @Input() public debounce: string;

    // eslint-disable-next-line @angular-eslint/no-output-native
    @Output() public readonly change = new EventEmitter();
    @Output() public readonly ready = new EventEmitter();
    // eslint-disable-next-line @angular-eslint/no-output-native
    @Output() public readonly blur = new EventEmitter();
    // eslint-disable-next-line @angular-eslint/no-output-native
    @Output() public readonly focus = new EventEmitter();
    @Output() public readonly disabled = new EventEmitter<boolean>();

    @ViewChild('host', { static: true }) public host: ElementRef;

    public instance: any;
    public debounceTimeout$sub: Subscription;

    private _readonly: boolean;
    private _inline = true;
    private _ready: boolean;
    private onDataChangeListener: any;

    @Input()
    public set readonly(value: boolean) {
        this._readonly = coerceBooleanProperty(value);
    }

    public get readonly(): boolean {
        return this._readonly;
    }

    @Input()
    public set inline(value: boolean) {
        this._inline = coerceBooleanProperty(value);
    }

    public get inline(): boolean {
        return this._inline;
    }

    private _value = '';

    /**
     * Constructor
     */
    public constructor(
        private zone: NgZone,
        private changeDetectorRef: ChangeDetectorRef,
        private initializer: DejaEditorService
    ) {
        super();
    }

    public get value(): string {
        return this._value;
    }

    @Input()
    public set value(v: string) {
        if (v !== this._value) {
            this._value = v;
        }
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.readonly && this.instance) {
            this.instance.setReadOnly(changes.readonly.currentValue);
        }
    }

    /**
     * On component destroy
     */
    public ngOnDestroy(): void {
        super.ngOnDestroy();

        this.focus.complete();
        this.blur.complete();
        this.change.complete();
        this.disabled.complete();
        if (this.instance) {
            this.instance.focusManager.blur(true);
            if (this._ready) {
                try {
                    // Workaround for a ckEditor bug
                    this.instance.destroy();
                } catch (e) {
                    console.warn(e, 'Error occurred when destroying ckEditor instance');
                }
                this.ready.complete();
                this.instance = null;
            } else {
                this.ready.pipe(
                    first(),
                    takeUntil(this.destroyed$)
                ).subscribe(() => {
                    try {
                        // Workaround for a ckEditor bug
                        this.instance.destroy();
                    } catch (e) {
                        console.warn(e, 'Error occurred when destroying ckEditor instance');
                    }
                    this.instance = null;
                    this.ready.complete();
                });
            }
        }
    }

    /**
     * On component view init
     */
    public ngAfterViewInit(): void {
        from(this.initializer.initDejaEditorLib()).pipe(
            take(1),
            tap(() => this.ckeditorInit(cloneDeep(this.config) || {})),
            delay(0),
            takeUntil(this.destroyed$)
        ).subscribe(() => this.changeDetectorRef.markForCheck());
    }

    /**
     * Value update process
     */
    public updateValue(): void {
        this.zone.run(() => {
            let value = this.instance.getData();
            if (!value) {
                value = null;
            }
            if (this.value !== value) {
                this.value = value;

                this.onChange(value);
                this.change.emit(value);
            }
        });
    }

    public textAreaChange(): void {
        this.zone.run(() => {
            const value = this.host.nativeElement.value;

            this.onChange(value);
            this.change.emit(value);
        });
    }

    /**
     * CKEditor init
     */
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    public ckeditorInit(config: any): void {
        if (typeof CKEDITOR === 'undefined') {
            console.warn('CKEditor 4.x is missing (http://ckeditor.com/)');
        } else {
            // Check textarea exists
            if (this.instance) {
                return;
            }

            if (this.readonly) {
                config.readOnly = this.readonly;
            }

            const keyEvents = config.on?.key;
            if (!config.on) {
                config.on = {};
            }
            config.on.key = (event: any) => {
                // Override CTRL+A event. Native one cause editor switch on first try
                if (event.data.code === 1114177) {
                    // CTRL + A
                    event.cancel();
                    event.stop();
                    this.instance.document.$.execCommand('SelectAll');
                }
                if (keyEvents) {
                    keyEvents(event);
                }
            };
            // CKEditor replace textarea
            if (this.inline) {
                this.instance = CKEDITOR.inline(
                    this.host.nativeElement,
                    config
                );
            } else {
                this.instance = CKEDITOR.replace(
                    this.host.nativeElement,
                    config
                );
            }

            // Set initial value
            this.instance.setData(this.value);

            // listen for instanceReady event
            this.instance.on('instanceReady', (evt: Event) => {
                this._ready = true;
                // send the evt to the EventEmitter
                this.ready.emit(evt);
            });

            // CKEditor blur event
            this.instance.on('blur', (evt: Event) => {
                this.blur.emit(evt);
                this.onTouched();
            });

            // CKEditor focus event
            this.instance.on('focus', (evt: Event) => {
                if (!this.readonly) {
                    this.focus.emit(evt);
                }
            });
            this.registerChangeListener();
        }
    }

    /**
     * Implements ControlValueAccessor
     */
    public writeValue(value: string): void {
        this._value = value;
        if (!this.destroyed$.closed) {
            timer(0).pipe( // See DEJS-728 that explain usage of async method
                takeUntil(this.destroyed$)
            ).subscribe(() => {
                if (this.instance) {
                    this.onDataChangeListener?.removeListener(); // The data change listener must be removed before setting the data,
                    // valueAccessor.onChange is called by the data change listener and must not be subsequently called on writeValue call which fire
                    // the data change event by calling instance.setData.
                    this.instance.setData(value, () => {
                        this.registerChangeListener();
                    });
                } else {
                    this.host.nativeElement.value = value;
                }
            });
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public onChange(_x: unknown): void { }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public onTouched(): void { }

    public registerOnChange(fn: (_a: unknown) => void): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    public setDisabledState(isDisabled: boolean): void {
        this.readonly = isDisabled;
        this.disabled.next(isDisabled);
        if (this._ready) {
            if (this.instance) {
                this.instance.setReadOnly(isDisabled);
            }
        } else if (!this.destroyed$.closed) {
            this.ready.pipe(
                take(1),
                takeUntil(this.destroyed$)
            ).subscribe(() => {
                this.instance.setReadOnly(this.readonly);
            });
        }
    }

    /**
     * Return the word at cursor position.
     *  - If the cursor is at the end of a word, it return that word.
     *  - If the cursor is at the begining of a word, it return that word.
     *  - If the cursor is in the middle of a word, it return that word.
     *  - If there are no word nearly the cursor, return null
     */
    public getWordAtCursor(): string {
        const range = this.instance.getSelection().getRanges(true)[0];
        if (!range) {
            return null;
        }
        const word = this.firstTextNode(range);
        return (word?.toReplace) || null;
    }

    public hasActiveSelection(): boolean {
        return !!this.getSelectedText();
    }

    public getSelectedText(): string {
        const selection = this.instance.getSelection();
        return selection.getSelectedText();
    }

    /**
     * Replace the content of the editor.
     *  - If there is an active selection, replace this selection
     *  - If the editor is empty, simply insert the text
     *  - If the cursor is near a word, replace this word with the text
     *  - If there is no selection, no word near the cursor, simply insert the text at the cursor position
     * @param replace the string to replace with
     */
    public replace(replace: string): void {
        if (!replace) {
            return;
        }
        const selection = this.getSelectedText();
        if (selection) {
            // Focus is used during the CKEDITOR insertText process and cause deselection of the selected text
            // So we temporarily deactivate it
            const focus = this.instance.focus;
            this.instance.focus = () => undefined as void;
            this.instance.insertHtml(replace);
            this.instance.focus = focus;
            return;
        }
        const range = this.instance.getSelection().getRanges(true)[0];
        if (!range) {
            this.instance.insertHtml(replace);
            return;
        }
        const text = this.firstTextNode(range);
        if (text) {
            this.replaceWord(text, replace);
        } else {
            this.instance.insertHtml(replace);
        }
        this.updateValue();
        this.setFocus();
    }

    public setFocus(): void {
        if (this.instance) {
            this.instance.focus();
        } else {
            this.host.nativeElement.focus();
        }
    }

    private registerChangeListener() {
        // CKEditor change event
        this.onDataChangeListener = this.instance.on('change', () => {
            // Debounce update
            if (this.debounce) {
                const debounce = parseInt(this.debounce, 10);
                this.debounceTimeout$sub?.unsubscribe();
                this.debounceTimeout$sub = timer(debounce).pipe(
                    takeUntil(this.destroyed$)
                ).subscribe(() => {
                    this.updateValue();
                    this.debounceTimeout$sub = null;
                });

                // Live update
            } else {
                this.updateValue();
            }
        });
    }

    private hasTextNodeAsChild(node: any, reverse = false): any {
        const children: any[] = node.getChildren().toArray();
        if (reverse) {
            // eslint-disable-next-line no-loops/no-loops
            for (let i = children.length - 1; i >= 0; i--) {
                const child = children[i];
                if (child.type === CKEDITOR.NODE_TEXT) {
                    return child;
                } else {
                    const inChild = this.hasTextNodeAsChild(child);
                    if (inChild) {
                        return inChild;
                    }
                }
            }
        } else {
            // eslint-disable-next-line no-loops/no-loops
            for (const child of children) {
                if (child.type === CKEDITOR.NODE_TEXT) {
                    return child;
                } else {
                    const inChild = this.hasTextNodeAsChild(child);
                    if (inChild) {
                        return inChild;
                    }
                }
            }
        }
        return null;
    }

    private mergeTextNodeAroundWithDirection(
        textNode: any,
        reverse = false
    ): void {
        const toRemove = [];
        let newText = textNode.getText();
        let x = textNode;
        // eslint-disable-next-line no-loops/no-loops
        while ((x = reverse ? x.getPrevious() : x.getNext)) {
            if (
                x.type !== CKEDITOR.NODE_TEXT ||
                x
                    .getText()
                    .charAt(reverse ? x.getText().length - 1 : 0)
                    .match(/[\s,;.:!?]/)
            ) {
                break;
            }
            if (reverse) {
                // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
                newText = x.getText() + newText;
            } else {
                newText += x.getText();
            }
            toRemove.push(x);
        }
        if (toRemove.length > 0) {
            textNode.setText(newText);
            toRemove.forEach(node => node.remove());
        }
    }

    private mergeTextNodeAround(textNode: any): any {
        this.mergeTextNodeAroundWithDirection(textNode, true);
        this.mergeTextNodeAroundWithDirection(textNode);
        return textNode;
    }

    private firstNonEmptyTextNode(node: any, reverse = false) {
        let x = node;
        // eslint-disable-next-line no-loops/no-loops
        while ((x = reverse ? x.getPrevious() : x.getNext())) {
            if (x.type === CKEDITOR.NODE_TEXT) {
                if (x.getText() !== '') {
                    return x;
                }
            } else {
                return x;
            }
        }

        return undefined;
    }

    private trim(text: string): string {
        if (text) {
            text = text.replace(/[\u200b\u00A0]/g, '').trim();
        }
        return text;
    }

    private extractFirstWord(text: string, reverse = false): string {
        if (!text) {
            return text;
        }
        if (text.includes(' ')) {
            const spaceSplit = text.split(' ');
            return this.trim(spaceSplit[reverse ? spaceSplit.length - 1 : 0]);
        } else {
            return this.trim(text);
        }
    }

    private firstTextNodeResult(selectedNode: any, reverse = false, firstNodeIsText = false): {
        textNode: any;
        firstNodeIsText: boolean;
        toReplace: string;
    } {
        const text: string = selectedNode.getText();
        if (this.trim(text) && this.trim(text.substring(text.length - 1))) {
            const node = this.mergeTextNodeAround(selectedNode);
            return {
                textNode: node,
                firstNodeIsText: firstNodeIsText,
                toReplace: this.extractFirstWord(node.getText(), reverse)
            };
        }
        return null;
    }

    private firstTextNodeWithDirection(range: any, reverse = false): {
        textNode: any;
        firstNodeIsText: boolean;
        toReplace: string;
    } {
        const startContainer = range.startContainer;
        if (reverse && startContainer.type === CKEDITOR.NODE_TEXT) {
            return this.firstTextNodeResult(startContainer, reverse, true);
        }
        const startNode: any = startContainer.type === CKEDITOR.NODE_TEXT ? ((reverse && this.firstNonEmptyTextNode(startContainer, true)) || this.firstNonEmptyTextNode(startContainer)) : startContainer.getChildren().getItem(range.startOffset - 1);
        if (startNode) {
            if (startNode.type === CKEDITOR.NODE_TEXT) {
                return this.firstTextNodeResult(startNode, reverse);
            }
            let x = this.hasTextNodeAsChild(startNode, reverse);
            if (x) {
                return this.firstTextNodeResult(x, reverse);
            }
            x = startNode;
            // eslint-disable-next-line no-loops/no-loops
            while ((x = reverse ? x.getPrevious() : x.getNext())) {
                if (x.type === CKEDITOR.NODE_TEXT) {
                    return this.firstTextNodeResult(x, reverse);
                }
                const textNode = this.hasTextNodeAsChild(x, reverse);
                if (textNode) {
                    return this.firstTextNodeResult(textNode, reverse);
                }
            }
        }
        return null;
    }

    private firstTextNode(
        range: any
    ): { textNode: any; firstNodeIsText: boolean; toReplace: string } {
        let textNode: {
            textNode: any;
            firstNodeIsText: boolean;
            toReplace: string;
        } = this.firstTextNodeWithDirection(range, true);
        if (!textNode) {
            textNode = this.firstTextNodeWithDirection(range);
        }
        return textNode;
    }

    private replaceWord(
        node: { textNode: any; firstNodeIsText: boolean; toReplace: string },
        replace: string
    ): void {
        const index = node.textNode.getText().lastIndexOf(node.toReplace);
        if (index !== -1) {
            const beforeText = node.textNode.getText().substring(0, index);
            // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
            const afterText = node.textNode.getText().substring(index + node.toReplace.length);
            node.textNode.setText(beforeText);
            // Wrap into a span otherwise methode createFromHtml will only take the html element :
            // For instance if replace is 'abc<br/>def', createFromHtml will create an html text element with abc only
            const newElement = CKEDITOR.dom.element.createFromHtml(`<span>${CKEDITOR.tools.htmlDecode(CKEDITOR.tools.transformPlainTextToHtml(
                replace,
                CKEDITOR.ENTER_BR
            ))}</span>`);
            newElement.insertAfter(node.textNode);
            // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
            if (node.textNode.getText().substring(index + node.toReplace.length)) {
                const end = new CKEDITOR.dom.text(afterText);
                end.insertAfter(newElement);
            }
            this.instance.getSelection().selectElement(node.textNode);
            const tmpRange = this.instance.getSelection().getRanges()[0];
            tmpRange.setStartAfter(node.textNode);
            tmpRange.select();
        }
    }
}
