/*
 * *
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 * /
 *
 */

import { Directive, ElementRef, forwardRef, HostBinding, HostListener, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { coerceBooleanProperty } from '@angular/material/core/coercion/boolean-property';
import { Observable, Subscription } from 'rxjs/Rx';
import { setTimeout } from 'timers';
import { KeyCodes } from "../../common/core/index";

const noop = () => { };

const DejaEditableDirectiveValueAccessor = {
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DejaEditableDirective),
};

@Directive({
    providers: [DejaEditableDirectiveValueAccessor],
    selector: '[deja-editable]',
})
export class DejaEditableDirective implements ControlValueAccessor {
    @HostBinding('attr.contenteditable') protected _inEdition = false;
    @HostBinding('attr.content') protected model: string;
    private _editMode = false;
    private _mandatory = false;
    private _multiline = false;
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;
    private globalClickObs: Subscription;
    private keydownObs: Subscription;

    constructor(private elementRef: ElementRef) {
    }

    /** Définit une valeur indiquant si le contenu édité est obligatoire. Si la valeur est 'true' la sortie du mode édition ne sera pas possible tant qu'un contenu n'est pas ajouté. */
    @Input()
    public set mandatory(value: boolean) {
        this._mandatory = coerceBooleanProperty(value);
    }

    /** Retourne une valeur indiquant si le contenu édité est obligatoire. Si la valeur est 'true' la sortie du mode édition ne sera pas possible tant qu'un contenu n'est pas ajouté. */
    public get mandatory() {
        return this._mandatory;
    }

    /** Définit une valeur indiquant si le contenu édité est multiligne */
    @Input()
    public set multiline(value: boolean) {
        this._multiline = coerceBooleanProperty(value);
    }

    /** Retourne une valeur indiquant si le contenu édité est multiligne */
    public get multiline() {
        return this._multiline;
    }

    /** Définit une valeur indiquant si l'édition est activée. */
    @Input('deja-editable')
    public set editMode(value: boolean) {
        this._editMode = coerceBooleanProperty(value);
    }

    /** Retourne une valeur indiquant si l'édition est activée. */
    public get editMode() {
        return this._editMode;
    }

    /** Définit une valeur indiquant si l'élément est en édition. */
    @Input()
    public set inEdition(value: boolean) {
        this._inEdition = coerceBooleanProperty(value);
        this.globalClick = this._inEdition;
        this.keydown = this._inEdition;
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
        this.elementRef.nativeElement.focus();
    }

    /** Place toute la zone d'édition en selectioné. */
    public selectAll() {
        let range = document.createRange();
        range.selectNodeContents(this.elementRef.nativeElement);
        let sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    }

    /** Active la zone d'édition. */
    public edit(selectOnFocus?: boolean) {
        this.inEdition = true;
        if (selectOnFocus !== false) {
            setTimeout(() => {
                this.selectAll();
                this.focus();
            }, 10);
        }
    }

    @HostListener('click', ['$event'])
    protected onClick(e: Event) {
        if (this.inEdition) {
            e.cancelBubble = true;
            return false;
        } else if (this.editMode) {
            this.edit();
            e.cancelBubble = true;
            return false;
        }
    }

    private set globalClick(value: boolean) {
        if (value) {
            if (this.globalClickObs) {
                return;
            }

            let element = this.elementRef.nativeElement as HTMLElement;
            this.globalClickObs = Observable.fromEvent(element.ownerDocument, 'click').subscribe((event: MouseEvent) => {
                if (this.isChildElement(event.target as HTMLElement)) {
                    return;
                }

                let text = this.elementRef.nativeElement.innerText;
                this.onTouchedCallback();
                if (text || !this.mandatory) {
                    this.value = text;
                } else {
                    this.refreshView();
                }

                this.inEdition = false;
            });

        } else if (this.globalClickObs) {
            this.globalClickObs.unsubscribe();
            delete this.globalClickObs;
        }
    }

    private set keydown(value: boolean) {
        let elem = this.elementRef.nativeElement as HTMLElement;
        if (value && this.inEdition) {
            if (this.keydownObs) {
                return;
            }

            this.keydownObs = Observable.fromEvent(elem, 'keydown').subscribe((e: KeyboardEvent) => {
                if (!this.inEdition) {
                    this.keydown = false;
                    return;
                }

                e.cancelBubble = true;
                if (e.keyCode === KeyCodes.Enter && !this.multiline) {
                    let text = this.elementRef.nativeElement.innerText;
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
            });
        } else if (this.keydownObs) {
            this.keydownObs.unsubscribe();
            delete this.keydownObs;
        }
    }

    private isChildElement(element: HTMLElement) {
        let parentElement = element;

        while (parentElement && parentElement !== this.elementRef.nativeElement) {
            parentElement = parentElement.parentElement;
        }

        return parentElement === this.elementRef.nativeElement;
    }

    private refreshView() {
        if (!this.model) {
            return;
        }
        this.elementRef.nativeElement.innerText = this.model;
    }
}
