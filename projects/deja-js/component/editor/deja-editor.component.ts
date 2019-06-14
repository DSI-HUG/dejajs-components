/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, Input, NgZone, OnChanges, OnDestroy, Output, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { DejaEditorService } from './deja-editor.service';

declare var CKEDITOR: any;

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
export class DejaEditorComponent
    implements OnChanges, AfterViewInit, OnDestroy, ControlValueAccessor {
    @Input() public config: any;
    @Input() public debounce: string;

    @Output() public change = new EventEmitter();
    @Output() public ready = new EventEmitter();
    @Output() public blur = new EventEmitter();
    @Output() public focus = new EventEmitter();
    @Output() public disabled = new EventEmitter<boolean>();

    @ViewChild('host') public host: ElementRef;

    private _readonly: boolean;
    private _inline = true;

    @Input()
    public set readonly(value: boolean) {
        this._readonly = coerceBooleanProperty(value);
    }

    public get readonly() {
        return this._readonly;
    }

    @Input()
    public set inline(value: boolean) {
        this._inline = coerceBooleanProperty(value);
    }

    public get inline() {
        return this._inline;
    }

    private _value = '';
    public instance: any;
    public debounceTimeout: any;

    /**
     * Constructor
     */
    constructor(
        private zone: NgZone,
        private _changeDetectorRef: ChangeDetectorRef,
        private _initializer: DejaEditorService
    ) { }

    public get value(): any {
        return this._value;
    }

    @Input()
    public set value(v) {
        if (v !== this._value) {
            this._value = v;
            this.onChange(v);
        }
    }

    public ngOnChanges(changes: SimpleChanges) {
        if (changes.readonly && this.instance) {
            this.instance.setReadOnly(changes.readonly.currentValue);
        }
    }

    /**
     * On component destroy
     */
    public ngOnDestroy() {
        this.focus.complete();
        this.blur.complete();
        this.change.complete();
        this.ready.complete();
        this.disabled.complete();
        if (this.instance) {
            this.instance.focusManager.blur(true);
            this.instance.destroy();
            this.instance = null;
        }
    }

    /**
     * On component view init
     */
    public ngAfterViewInit() {
        this._initializer.initDejaEditorLib().then(() => {
            this.ckeditorInit(this.config || {});
            // Effectively display the editor even if parents component ChangeDetectionStrategy is OnPush
            setTimeout(() => this._changeDetectorRef.markForCheck());
        });
    }

    /**
     * Value update process
     */
    public updateValue() {
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

    public textAreaChange() {
        this.zone.run(() => {
            const value = this.host.nativeElement.value;

            this.onChange(value);
            this.change.emit(value);
        });
    }

    /**
     * CKEditor init
     */
    public ckeditorInit(config: any) {
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

            const keyEvents = config.on && config.on.key;
            if (!config.on) {
                config.on = {};
            }
            config.on.key = (event: any) => {
                // Override CTRL+A event. Native one cause editor switch on first try
                if (event.data.keyCode === 1114177) {
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
            this.instance.on('instanceReady', (evt: any) => {
                // send the evt to the EventEmitter
                this.ready.emit(evt);
            });

            // CKEditor change event
            this.instance.on('change', () => {

                // Debounce update
                if (this.debounce) {
                    if (this.debounceTimeout) {
                        clearTimeout(this.debounceTimeout);
                    }
                    this.debounceTimeout = setTimeout(() => {
                        this.updateValue();
                        this.debounceTimeout = null;
                    }, parseInt(this.debounce, 10));

                    // Live update
                } else {
                    this.updateValue();
                }
            });

            // CKEditor blur event
            this.instance.on('blur', (evt: any) => {
                this.blur.emit(evt);
                this.onTouched();
            });

            // CKEditor focus event
            this.instance.on('focus', (evt: any) => {
                if (!this.readonly) {
                    this.focus.emit(evt);
                }
            });
        }
    }

    /**
     * Implements ControlValueAccessor
     */
    public writeValue(value: any) {
        this._value = value;
        if (this.instance) {
            this.instance.setData(value);
        } else {
            this.host.nativeElement.value = value;
        }
    }

    public onChange(_: any) { }

    public onTouched() { }

    public registerOnChange(fn: any) {
        this.onChange = fn;
    }

    public registerOnTouched(fn: any) {
        this.onTouched = fn;
    }

    public setDisabledState(isDisabled: boolean) {
        this.readonly = isDisabled;
        this.disabled.next(isDisabled);
        if (this.instance) {
            this.instance.setReadOnly(isDisabled);
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
        const word = this._firstTextNode(range);
        return (word && word.toReplace) || null;
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
            this.instance.focus = () => { };
            this.instance.insertText(replace);
            this.instance.focus = focus;
            return;
        }
        const range = this.instance.getSelection().getRanges(true)[0];
        if (!range) {
            this.instance.insertText(replace);
            return;
        }
        const text = this._firstTextNode(range);
        if (text) {
            this._replaceWord(text, replace);
        } else {
            this.instance.insertText(replace);
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

    private _hasTextNodeAsChild(node: any, reverse = false): any {
        const children: any[] = node.getChildren().toArray();
        if (reverse) {
            for (let i = children.length - 1; i >= 0; i--) {
                const child = children[i];
                if (child.type === CKEDITOR.NODE_TEXT) {
                    return child;
                } else {
                    const inChild = this._hasTextNodeAsChild(child);
                    if (inChild) {
                        return inChild;
                    }
                }
            }
        } else {
            for (const child of children) {
                if (child.type === CKEDITOR.NODE_TEXT) {
                    return child;
                } else {
                    const inChild = this._hasTextNodeAsChild(child);
                    if (inChild) {
                        return inChild;
                    }
                }
            }
        }
        return null;
    }

    private _mergeTextNodeAroundWithDirection(
        textNode: any,
        reverse = false
    ): void {
        const toRemove = [];
        let newText = textNode.getText();
        let x = textNode;
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

    private _mergeTextNodeAround(textNode: any): any {
        this._mergeTextNodeAroundWithDirection(textNode, true);
        this._mergeTextNodeAroundWithDirection(textNode);
        return textNode;
    }

    private _firstNonEmptyTextNode(node: any, reverse = false): any {
        let x = node;
        while ((x = reverse ? x.getPrevious() : x.getNext())) {
            if (x.type === CKEDITOR.NODE_TEXT) {
                if (x.getText() !== '') {
                    return x;
                }
            } else {
                return x;
            }
        }
    }

    private _trim(text: string): string {
        if (text) {
            text = text.replace(/[\u200b\u00A0]/g, '').trim();
        }
        return text;
    }

    private _extractFirstWord(text: string, reverse = false): string {
        if (!text) {
            return text;
        }
        if (text.indexOf(' ') !== -1) {
            const spaceSplit = text.split(' ');
            return this._trim(spaceSplit[reverse ? spaceSplit.length - 1 : 0]);
        } else {
            return this._trim(text);
        }
    }

    private _firstTextNodeResult(
        selectedNode: any,
        reverse = false,
        firstNodeIsText = false
    ): {
        textNode: any;
        firstNodeIsText: boolean;
        toReplace: string;
    } {
        const text: string = selectedNode.getText();
        if (this._trim(text) && this._trim(text.substring(text.length - 1))) {
            const node = this._mergeTextNodeAround(selectedNode);
            return {
                textNode: node,
                firstNodeIsText: firstNodeIsText,
                toReplace: this._extractFirstWord(node.getText(), reverse)
            };
        }
        return null;
    }

    private _firstTextNodeWithDirection(
        range: any,
        reverse = false
    ): {
        textNode: any;
        firstNodeIsText: boolean;
        toReplace: string;
    } {
        const startContainer: any = range.startContainer;
        if (reverse && startContainer.type === CKEDITOR.NODE_TEXT) {
            return this._firstTextNodeResult(startContainer, reverse, true);
        }
        const startNode: any =
            startContainer.type === CKEDITOR.NODE_TEXT
                ? reverse
                    ? this._firstNonEmptyTextNode(startContainer, true)
                    : this._firstNonEmptyTextNode(startContainer)
                : startContainer.getChildren().getItem(range.startOffset - 1);
        if (startNode) {
            if (startNode.type === CKEDITOR.NODE_TEXT) {
                return this._firstTextNodeResult(startNode, reverse);
            }
            let x = this._hasTextNodeAsChild(startNode, reverse);
            if (x) {
                return this._firstTextNodeResult(x, reverse);
            }
            x = startNode;
            while ((x = reverse ? x.getPrevious() : x.getNext())) {
                if (x.type === CKEDITOR.NODE_TEXT) {
                    return this._firstTextNodeResult(x, reverse);
                }
                const textNode = this._hasTextNodeAsChild(x, reverse);
                if (textNode) {
                    return this._firstTextNodeResult(textNode, reverse);
                }
            }
        }
        return null;
    }

    private _firstTextNode(
        range: any
    ): { textNode: any; firstNodeIsText: boolean; toReplace: string } {
        let textNode: {
            textNode: any;
            firstNodeIsText: boolean;
            toReplace: string;
        } = this._firstTextNodeWithDirection(range, true);
        if (!textNode) {
            textNode = this._firstTextNodeWithDirection(range);
        }
        return textNode;
    }

    private _replaceWord(
        node: { textNode: any; firstNodeIsText: boolean; toReplace: string },
        replace: string
    ): void {
        const index = node.textNode.getText().lastIndexOf(node.toReplace);
        if (index !== -1) {
            const beforeText = node.textNode.getText().substring(0, index);
            const afterText = node.textNode.getText().substring(index + node.toReplace.length);
            node.textNode.setText(beforeText);
            const newElement = CKEDITOR.dom.element.createFromHtml(
                `<span>${CKEDITOR.tools.transformPlainTextToHtml(
                    replace,
                    CKEDITOR.ENTER_BR
                )}</span>`
            );
            newElement.insertAfter(node.textNode);
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
