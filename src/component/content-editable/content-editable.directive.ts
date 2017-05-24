/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Directive, ElementRef, HostBinding, Input, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/takeUntil';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { KeyCodes } from '../../common/core/keycodes.enum';

const noop = () => { };

@Directive({
    selector: '[deja-editable]',
})
export class DejaEditableDirective implements ControlValueAccessor {
    private model: string;
    private _inEdition = false;
    private _editMode = false;
    private _mandatory = false;
    private _multiline = false;
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;
    private edit$ = new BehaviorSubject<[boolean, boolean]>([false, false]);
    private element: HTMLElement;

    @HostBinding('attr.disabled') private _disabled = null;

    constructor(elementRef: ElementRef, @Self() @Optional() public _control: NgControl) {
        if (this._control) {
            this._control.valueAccessor = this;
        }

        this.element = elementRef.nativeElement as HTMLElement;

        Observable.fromEvent(this.element, 'mousedown')
            .subscribe((e: MouseEvent) => {
                if (this.inEdition || this.disabled) {
                    e.cancelBubble = true;
                    return false;
                } else if (this.editMode) {
                    this.edit$.next([true, true]);
                    e.cancelBubble = true;
                    return false;
                }
            });

        const inEdition$ = Observable.from(this.edit$)
            .map(([value, selectOnFocus]) => {
                if (selectOnFocus !== false) {
                    Observable.timer(10)
                        .first()
                        .subscribe(() => {
                            this.selectAll();
                            this.focus();
                        });
                }
                return value;
            })
            .do((value) => {
                this._inEdition = value;
                if (value) {
                    this.element.setAttribute('contenteditable', 'true');
                } else {
                    this.element.removeAttribute('contenteditable');
                }
            });

        const kill$ = inEdition$
            .filter((value) => !value);

        inEdition$
            .filter((value) => value)
            .subscribe(() => {
                Observable.fromEvent(this.element.ownerDocument, 'mousedown')
                    .takeUntil(kill$)
                    .filter((event: MouseEvent) => !this.isChildElement(event.target as HTMLElement))
                    .subscribe(() => {
                        const text = this.element.innerText;
                        this.onTouchedCallback();
                        if (text || !this.mandatory) {
                            this.value = text;
                        } else {
                            this.refreshView();
                        }

                        this.inEdition = false;
                    });

                Observable.fromEvent(this.element, 'keydown')
                    .takeUntil(kill$)
                    .subscribe((e: KeyboardEvent) => {
                        e.cancelBubble = true;
                        e.stopPropagation();
                        if (e.keyCode === KeyCodes.Enter && !this.multiline) {
                            const text = this.element.innerText;
                            if (text || !this.mandatory) {
                                this.value = text;
                            } else {
                                this.refreshView();
                            }
                            this.inEdition = false;
                            return false;
                        } else if (e.keyCode === KeyCodes.Escape) {
                            this.refreshView();
                            this.inEdition = false;
                            return false;
                        }
                        return false;
                    });
            });
    }

    /** Définit une valeur indiquant si le contenu édité est obligatoire. Si la valeur est 'true' la sortie du mode édition ne sera pas possible tant qu'un contenu n'est pas ajouté. */
    @Input()
    public set mandatory(value: boolean | string) {
        this._mandatory = value != null && `${value}` !== 'false';
    }

    /** Retourne une valeur indiquant si le contenu édité est obligatoire. Si la valeur est 'true' la sortie du mode édition ne sera pas possible tant qu'un contenu n'est pas ajouté. */
    public get mandatory() {
        return this._mandatory;
    }

    /** Définit une valeur indiquant si le contenu édité est multiligne */
    @Input()
    public set multiline(value: boolean | string) {
        this._multiline = value != null && `${value}` !== 'false';
    }

    /** Retourne une valeur indiquant si le contenu édité est multiligne */
    public get multiline() {
        return this._multiline;
    }

    /** Permet de désactiver le controle */
    @Input()
    public set disabled(value: boolean | string) {
        const disabled = value != null && `${value}` !== 'false';
        this._disabled = disabled || null;
        if (this.disabled) {
            this.edit$.next([false, false]);
        }
    }

    public get disabled() {
        return this._control ? this._control.disabled : this._disabled;
    }

    /** Définit une valeur indiquant si l'édition est activée. */
    @Input('deja-editable')
    public set editMode(value: boolean | string) {
        this._editMode = value != null && `${value}` !== 'false';
    }

    /** Retourne une valeur indiquant si l'édition est activée. */
    public get editMode() {
        return this._editMode;
    }

    /** Définit une valeur indiquant si l'élément est en édition. */
    @Input()
    public set inEdition(value: boolean | string) {
        if (this.disabled) {
            return;
        }
        this.edit$.next([value != null && `${value}` !== 'false', false]);
    }

    /** Retourne une valeur indiquant si l'élément est en édition. */
    public get inEdition() {
        return this._inEdition;
    }

    // ************* ControlValueAccessor Implementation **************
    // set accessor including call the onchange callback
    public set value(model: any) {
        if (model !== this.model) {
            this.writeValue(model);
            this.onChangeCallback(model);
        }
    }

    // get accessor
    public get value(): any {
        return this.model;
    }

    // From ControlValueAccessor interface
    public writeValue(value: any) {
        this.model = value;
        this.refreshView();
    }

    // From ControlValueAccessor interface
    public registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    // From ControlValueAccessor interface
    public registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }
    // ************* End of ControlValueAccessor Implementation **************

    /** Donne le focus à la zone d'édition. */
    public focus() {
        this.element.focus();
    }

    /** Place toute la zone d'édition en selectioné. */
    public selectAll() {
        const range = document.createRange();
        range.selectNodeContents(this.element);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    }

    /** Active la zone d'édition. */
    public edit(selectOnFocus?: boolean) {
        this.edit$.next([!this.disabled, selectOnFocus]);
    }

    private isChildElement(element: HTMLElement) {
        let parentElement = element;

        while (parentElement && parentElement !== this.element) {
            parentElement = parentElement.parentElement;
        }

        return parentElement === this.element;
    }

    private refreshView() {
        if (!this.model) {
            return;
        }
        this.element.innerText = this.model;
    }
}
