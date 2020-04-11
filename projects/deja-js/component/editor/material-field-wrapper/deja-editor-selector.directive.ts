/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive } from '@angular/core';
import { DoCheck } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Host } from '@angular/core';
import { HostBinding } from '@angular/core';
import { Input } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Optional } from '@angular/core';
import { Self } from '@angular/core';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { CanUpdateErrorState } from '@angular/material/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { _MatInputMixinBase } from '@deja-js/core/util';
import { Subject } from 'rxjs';
import { DejaEditorComponent } from '../deja-editor.component';

let nextUniqueId = 0;

@Directive({
    selector: 'deja-editor',
    providers: [
        {
            provide: MatFormFieldControl,
            useExisting: DejaEditorSelectorDirective
        }
    ]
})
export class DejaEditorSelectorDirective extends _MatInputMixinBase implements MatFormFieldControl<any>, DoCheck, OnInit, OnDestroy, CanUpdateErrorState {
    public errorState: boolean;
    public autofilled?: boolean;
    protected _uid = `mat-input-${nextUniqueId++}`;
    private _placeholder: HTMLDivElement;
    public value: any;
    public stateChanges: Subject<void> = new Subject<void>();
    @Input()
    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value || this._uid;
    }
    protected _id: string;
    @Input() public placeholder: string;
    public focused: boolean;
    @Input()
    public get required(): boolean {
        return this._required;
    }
    public set required(value: boolean) {
        this._required = coerceBooleanProperty(value);
    }
    protected _required = false;
    @Input()
    public get disabled(): boolean {
        if (this.ngControl && this.ngControl.disabled !== null) {
            return this.ngControl.disabled;
        }
        return this._disabled;
    }
    public set disabled(value: boolean) {
        this._disabled = coerceBooleanProperty(value);

        // Browsers may not fire the blur event if the input is disabled too quickly.
        // Reset from here to ensure that the element doesn't become stuck.
        if (this.focused) {
            this.focused = false;
            this.stateChanges.next();
        }
    }
    protected _disabled = false;
    @HostBinding('attr.aria-describedby') public describedBy = '';
    public controlType = 'app-editor';
    public onContainerClick(): void {
        this._editor.setFocus();
    }

    constructor(
        @Self() private _editor: DejaEditorComponent,
        @Optional()
        @Self()
        public ngControl: NgControl,
        @Optional() _parentForm: NgForm,
        @Optional() _parentFormGroup: FormGroupDirective,
        _defaultErrorStateMatcher: ErrorStateMatcher,
        @Host() private _hostElement: ElementRef
    ) {
        super(
            _defaultErrorStateMatcher,
            _parentForm,
            _parentFormGroup,
            ngControl
        );
    }

    public setDescribedByIds(ids: string[]): void {
        this.describedBy = ids.join(' ');
    }

    public ngOnInit() {
        this._editor.focus.subscribe(() => {
            this.focused = true;
            this.stateChanges.next();
        });

        this._editor.blur.subscribe(() => {
            this.focused = false;
            this.stateChanges.next();
        });
        this._editor.change.subscribe(() => {
            this.stateChanges.next();
        });
        this._generatePlaceholder();
    }

    public ngDoCheck() {
        if (this.ngControl) {
            this.updateErrorState();
        }
    }

    public ngOnDestroy(): void {
        this.stateChanges.complete();
    }

    public get empty(): boolean {
        return !this._editor.value;
    }

    public get shouldLabelFloat(): boolean {
        if (this.focused || !this.empty) {
            if (this.empty) {
                this._attachPlaceholder();
            } else {
                this._detachPlaceholder();
            }
            return true;
        } else {
            this._detachPlaceholder();
            return false;
        }
    }

    private _attachPlaceholder() {
        if (this._placeholder && !this._placeholder.parentElement) {
            this._hostElement.nativeElement.appendChild(this._placeholder);
        }
    }

    private _detachPlaceholder() {
        if (this._placeholder && this._placeholder.parentElement) {
            this._placeholder.remove();
        }
    }

    private _generatePlaceholder() {
        if (this.placeholder) {
            this._placeholder = document.createElement('div');
            this._placeholder.style.position = 'absolute';
            this._placeholder.style.position = 'absolute';
            this._placeholder.style.left = '0';
            this._placeholder.style.boxSizing = 'content-box';
            this._placeholder.style.width = '100%';
            this._placeholder.style.height = '100%';
            this._placeholder.style.overflow = 'hidden';
            this._placeholder.style.pointerEvents = 'none';
            this._placeholder.style.top = '-0.84375em';
            this._placeholder.style.paddingTop = '0.84375em';
            const placeholderChildren = document.createElement('div');
            placeholderChildren.style.color = 'rgba(0,0,0,0.54)';
            placeholderChildren.style.top = '1.28125em';
            placeholderChildren.style.position = 'absolute';
            const placeholderText = document.createTextNode(this.placeholder);
            placeholderChildren.appendChild(placeholderText);
            this._placeholder.appendChild(placeholderChildren);
        }
    }
}
