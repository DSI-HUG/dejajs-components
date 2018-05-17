/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    NgZone,
    OnChanges,
    OnDestroy,
    Output,
    SimpleChanges,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { DejaEditorService } from './deja-editor.service';
import { StringUtils } from './string.utils';

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
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DejaEditorComponent
    implements
        OnChanges,
        AfterViewInit,
        OnDestroy,
        ControlValueAccessor {
    @Input() public config: any;
    @Input() public readonly: boolean;
    @Input() public debounce: string;
    @Input() public inline = true;

    @Output() public change = new EventEmitter();
    @Output() public ready = new EventEmitter();
    @Output() public blur = new EventEmitter();
    @Output() public focus = new EventEmitter();
    @Output() public disabled = new EventEmitter<boolean>();

    @ViewChild('host') public host: ElementRef;

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
    ) {}

    get value(): any {
        return this._value;
    }

    @Input()
    set value(v) {
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
            // Wait for angular component to be destroyed before destroying ckeditor instances
            setTimeout(() => {
                this.instance.focusManager.blur(true);
                this.instance.removeAllListeners();
                CKEDITOR.instances[this.instance.name].destroy();
                this.instance.destroy();
                this.instance = null;
            });
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
    public updateValue(value: any) {
        this.zone.run(() => {
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
            if (this.instance || !document.contains(this.host.nativeElement)) {
                return;
            }

            if (this.readonly) {
                config.readOnly = this.readonly;
            }
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
                const value = this.instance.getData();

                // Debounce update
                if (this.debounce) {
                    if (this.debounceTimeout) {
                        clearTimeout(this.debounceTimeout);
                    }
                    this.debounceTimeout = setTimeout(() => {
                        this.updateValue(value);
                        this.debounceTimeout = null;
                    }, parseInt(this.debounce, null));

                    // Live update
                } else {
                    this.updateValue(value);
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
        console.log(value);
        this._value = value;
        if (this.instance) {
            this.instance.setData(value);
        } else {
            this.host.nativeElement.value = value;
        }
    }

    public onChange(_: any) {}

    public onTouched() {}

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

    public getPreviousWord(): string {
        const range = this.instance
            .getSelection()
            .getRanges(true)[0];
        const startNode: any = range.startContainer;
        if (startNode instanceof CKEDITOR.dom.text) {
            // Range at the non-zero position of a text node.
            const value = startNode.getText();
            if (range.startOffset === range.endOffset) {
                return StringUtils.getLastWord(value, range.startOffset);
            }
            return null;
        } else {
            // Expand the range to the beginning of editable.
            range.collapse(true);
            range.setStartAt(
                this.instance.editable(),
                CKEDITOR.POSITION_AFTER_START
            );

            // Let's use the walker to find the closes (previous) text node.
            const walker = new CKEDITOR.dom.walker(range);
            let node;
            while ((node = walker.previous())) {
                // If found, return the last character of the text node.
                if (node instanceof CKEDITOR.dom.text) {
                    const value = startNode.getText();
                    if (range.startOffset === range.endOffset) {
                        return StringUtils.getLastWord(
                            value,
                            range.startOffset
                        );
                    }
                    return null;
                }
            }
        }
        return null;
    }

    public hasActiveSelection(): boolean {
        return !!this.getSelectedText();
    }

    public getSelectedText(): string {
        const selection = this.instance.getSelection();
        return selection.getSelectedText();
    }

    public replace(replace: string): void {
        if (replace) {
            const selection = this.getSelectedText();
            if (selection) {
                this.instance.insertText(replace);
            } else {
                let newElement;
                let range = this.instance.getSelection().getRanges(true)[0];
                let startNode = range.startContainer;
                if (
                    !(startNode instanceof CKEDITOR.dom.text) ||
                    !startNode.getText()
                ) {
                    startNode = this._lastTextNode(range);
                }
                if (startNode) {
                    // Range at the non-zero position of a text node.
                    const newTextAndPosition = StringUtils.removeLastWord(
                        startNode.getText(),
                        range.startOffset - 1,
                        range.endOffset - 1
                    );
                    startNode.setText(newTextAndPosition.startValue);
                    newElement = CKEDITOR.dom.element.createFromHtml(
                        replace
                    );
                    newElement.insertAfter(startNode);
                    if (newTextAndPosition.endValue) {
                        const endNode = new CKEDITOR.dom.text(
                            newTextAndPosition.endValue
                        );
                        endNode.insertAfter(newElement);
                    } else if (startNode.getNext()) {
                        let next = startNode.getNext();
                        let x = StringUtils.removeLastWord(next.getText(), 0, 0);
                        while (x.endValue === next.getText) {
                            next.setText(x.endValue);
                            next = next.getNext();
                            x = StringUtils.removeLastWord(next.getText(), 0, 0);
                        }
                    }
                    this.instance.getSelection().selectElement(newElement);
                    range = this.instance.getSelection().getRanges()[0];
                    range.setStartAfter(newElement);
                    range.select();
                } else {
                    this.instance.insertText(replace);
                }
            }
            this.setFocus();
        }
    }

    private _lastTextNode(range: any): any {
        range.collapse(true);
        range.setStartAt(
            this.instance.editable(),
            CKEDITOR.POSITION_AFTER_START
        );
        // Let's use the walker to find the closes (previous) text node.
        const walker = new CKEDITOR.dom.walker(range);
        let node;
        while ((node = walker.previous())) {
            // If found, return the last character of the text node.
            if (node instanceof CKEDITOR.dom.text && node.getText()) {
                return node;
            }
        }
        return null;
    }

    public insertText(text: string) {
        this.instance.insertText(text);
        this.setFocus();
    }

    public setFocus() {
        if (this.instance) {
            this.instance.focus();
        } else {
            this.host.nativeElement.focus();
        }
    }
}
