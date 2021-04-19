/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, ElementRef, HostBinding, Input, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Destroy, KeyCodes } from '@deja-js/component/core';
import { BehaviorSubject, fromEvent, Observable, timer } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap, take, takeUntil } from 'rxjs/operators';

@Directive({
    selector: '[deja-editable]'
})
export class DejaEditableDirective extends Destroy implements ControlValueAccessor, OnInit {
    @HostBinding('attr.disabled') public _disabled: boolean = null;

    private model: string;
    private _inEdition = false;
    private _editMode = false;
    private _mandatory = false;
    private _multiline = false;
    private edit$ = new BehaviorSubject<[boolean, boolean]>([false, false]);
    private element: HTMLElement;

    public constructor(elementRef: ElementRef, @Self() @Optional() public control: NgControl) {
        super();

        if (this.control) {
            this.control.valueAccessor = this;
        }

        this.element = elementRef.nativeElement as HTMLElement;

        const mouseDownEvent$ = fromEvent(this.element, 'mousedown') as Observable<MouseEvent>;
        mouseDownEvent$.pipe(
            takeUntil(this.destroyed$)
        ).subscribe(e => {
            if (this.inEdition || this.disabled) {
                e.cancelBubble = true;
                return false;
            } else if (this.editMode) {
                this.edit$.next([true, true]);
                e.cancelBubble = true;
                return false;
            }
            return undefined;
        });

        const inEdition$ = this.edit$.pipe(
            distinctUntilChanged(),
            map(([value, selectOnFocus]) => {
                if (selectOnFocus !== false) {
                    timer(10).pipe(
                        take(1),
                        takeUntil(this.destroyed$)
                    ).subscribe(() => {
                        this.selectAll();
                        this.focus();
                    });
                }

                this._inEdition = value;
                if (value) {
                    this.element.setAttribute('contenteditable', 'true');
                } else {
                    this.element.removeAttribute('contenteditable');
                }
                this.refreshView();
                return value;
            })
        );

        const kill$ = inEdition$.pipe(
            filter(value => !value)
        );

        const mouseDown$ = fromEvent(this.element.ownerDocument, 'mousedown').pipe(
            filter(event => !this.isChildElement(event.target as HTMLElement)),
            takeUntil(kill$)
        ) as Observable<MouseEvent>;

        inEdition$.pipe(
            filter(value => value),
            switchMap(() => mouseDown$),
            takeUntil(this.destroyed$)
        ).subscribe(() => {
            const text = this.element.innerText.replace(/\n/g, '<br />').replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
            this.onTouchedCallback();
            if (text || !this.mandatory) {
                this.value = text;
            }
            this.inEdition = false;
        });

        const keyDown$ = fromEvent(this.element, 'keydown').pipe(
            takeUntil(kill$)
        ) as Observable<KeyboardEvent>;

        inEdition$.pipe(
            filter(value => value),
            switchMap(() => keyDown$),
            takeUntil(this.destroyed$)
        ).subscribe(e => {
            e.cancelBubble = true;
            e.stopPropagation();
            if (e.code === KeyCodes.Enter && !this.multiline) {
                const text = this.element.innerText;
                if (text || !this.mandatory) {
                    this.value = text;
                }
                this.inEdition = false;
            } else if (e.code === KeyCodes.Escape) {
                this.inEdition = false;
            }
            return false;
        });
    }

    /** Définit une valeur indiquant si le contenu édité est obligatoire. Si la valeur est 'true' la sortie du mode édition ne sera pas possible tant qu'un contenu n'est pas ajouté. */
    @Input()
    public set mandatory(value: BooleanInput) {
        this._mandatory = coerceBooleanProperty(value);
    }

    /** Retourne une valeur indiquant si le contenu édité est obligatoire. Si la valeur est 'true' la sortie du mode édition ne sera pas possible tant qu'un contenu n'est pas ajouté. */
    public get mandatory(): BooleanInput {
        return this._mandatory;
    }

    /** Définit une valeur indiquant si le contenu édité est multiligne */
    @Input()
    public set multiline(value: BooleanInput) {
        this._multiline = coerceBooleanProperty(value);
    }

    /** Retourne une valeur indiquant si le contenu édité est multiligne */
    public get multiline(): BooleanInput {
        return this._multiline;
    }

    /** Permet de désactiver le controle */
    @Input()
    public set disabled(value: BooleanInput) {
        const disabled = coerceBooleanProperty(value);
        this._disabled = disabled || null;
        if (this.disabled) {
            this.edit$.next([false, false]);
        }
    }

    public get disabled(): BooleanInput {
        return this.control?.disabled || this._disabled;
    }

    /** Définit une valeur indiquant si l'édition est activée. */
    @Input('deja-editable')
    public set editMode(value: BooleanInput) {
        this._editMode = coerceBooleanProperty(value);
    }

    /** Retourne une valeur indiquant si l'édition est activée. */
    public get editMode(): BooleanInput {
        return this._editMode;
    }

    /** Définit une valeur indiquant si l'élément est en édition. */
    @Input()
    public set inEdition(value: BooleanInput) {
        if (this.disabled) {
            return;
        }
        this.edit$.next([coerceBooleanProperty(value), false]);
    }

    /** Retourne une valeur indiquant si l'élément est en édition. */
    public get inEdition(): BooleanInput {
        return this._inEdition;
    }

    // ************* ControlValueAccessor Implementation **************
    // set accessor including call the onchange callback
    public set value(model: string) {
        if (model !== this.model) {
            this.writeValue(model);
            this.onChangeCallback(model);
        }
    }

    // get accessor
    public get value(): string {
        return this.model;
    }

    // From ControlValueAccessor interface
    public writeValue(value: string): void {
        this.model = value;
        this.refreshView();
    }

    // From ControlValueAccessor interface
    public registerOnChange(fn: (_a: unknown) => void): void {
        this.onChangeCallback = fn;
    }

    // From ControlValueAccessor interface
    public registerOnTouched(fn: () => void): void {
        this.onTouchedCallback = fn;
    }

    public setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }
    // ************* End of ControlValueAccessor Implementation **************

    public ngOnInit(): void {
        this.model = this.element.innerHTML;
    }

    /** Donne le focus à la zone d'édition. */
    public focus(): void {
        this.element.focus();
    }

    /** Place toute la zone d'édition en selectioné. */
    public selectAll(): void {
        const range = document.createRange();
        range.selectNodeContents(this.element);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    }

    /** Active la zone d'édition. */
    public edit(selectOnFocus?: boolean): void {
        this.edit$.next([!this.disabled, selectOnFocus]);
    }

    public onTouchedCallback = (): void => undefined;
    public onChangeCallback = (_a?: unknown): void => undefined;

    private isChildElement(element: HTMLElement) {
        let parentElement = element;

        // eslint-disable-next-line no-loops/no-loops
        while (parentElement && parentElement !== this.element) {
            parentElement = parentElement.parentElement;
        }

        return parentElement === this.element;
    }

    private refreshView() {
        if (!this.model) {
            return;
        }

        if (this.inEdition) {
            this.element.innerText = this.model.replace(/<br\s*[/]?>/gi, '\n');
        } else {
            this.element.innerHTML = this.model.replace(/\n/g, '<br />');
        }
    }
}
