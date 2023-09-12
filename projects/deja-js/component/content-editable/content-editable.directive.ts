/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, ElementRef, HostBinding, inject, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Destroy, KeyCodes } from '@deja-js/component/core';
import { delay, filter, fromEvent, map, mergeWith, ReplaySubject, shareReplay, switchMap, take, takeUntil, tap } from 'rxjs';

type EditState = 'edit' | 'cancel' | 'submit';

@Directive({
    selector: '[deja-editable]'
})
export class DejaEditableDirective extends Destroy implements ControlValueAccessor, OnInit {
    @HostBinding('attr.disabled') public _disabled: boolean | null = null;

    private model?: string | undefined;
    private _inEdition = false;
    private _editMode = false;
    private _mandatory = false;
    private _multiline = false;
    private _selectOnFocus = false;
    private edit$ = new ReplaySubject<boolean>(1);
    private element: HTMLElement;

    private elementRef = inject<ElementRef<HTMLElement>>(ElementRef<HTMLElement>);
    private control = inject(NgControl, { optional: true, self: true });

    public constructor() {
        super();

        if (this.control) {
            this.control.valueAccessor = this;
        }

        this.element = this.elementRef.nativeElement;

        const edit$ = this.edit$.pipe(
            filter(Boolean),
            map(() => undefined as MouseEvent | undefined)
        );

        const keyDown$ = fromEvent<KeyboardEvent>(this.element, 'keydown').pipe(
            shareReplay({ bufferSize: 1, refCount: true })
        );

        const escape$ = keyDown$.pipe(
            filter(event => event.key === 'Escape'),
            map(() => 'cancel' as EditState)
        );

        const submit$ = keyDown$.pipe(
            filter(event => (event.code === String(KeyCodes.Enter)) && !this.multiline),
            map(() => 'submit' as EditState)
        );

        const documentMouseDown$ = fromEvent<MouseEvent>(document, 'mousedown').pipe(
            filter(event => event.target !== this.element)
        );

        const editState$ = fromEvent<MouseEvent>(this.element, 'mousedown').pipe(
            tap(event => event.stopPropagation()),
            filter(() => this._editMode),
            mergeWith(edit$),
            filter(() => !this._inEdition && !this.disabled),
            map(() => 'edit' as EditState),
            shareReplay({ bufferSize: 1, refCount: true })
        );

        const cancelEdition$ = editState$.pipe(
            switchMap(() => this.edit$.pipe(
                filter(edit => !edit),
                mergeWith(documentMouseDown$),
                filter(() => this._inEdition),
                map(() => 'submit' as EditState),
                mergeWith(escape$, submit$),
                take(1)
            ))
        );

        editState$.pipe(
            mergeWith(cancelEdition$),
            tap(editState => {
                this._inEdition = editState === 'edit';

                if (this._inEdition) {
                    this.element.setAttribute('contenteditable', 'true');
                    this.refreshView();
                } else {
                    this.element.removeAttribute('contenteditable');

                    if (editState === 'submit') {
                        const text = this.element.innerText.replace(/\n/g, '<br />').replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
                        this.onTouchedCallback();
                        if (text || !this.mandatory) {
                            this.value = text;
                        }
                    } else {
                        this.refreshView();
                    }
                }
            }),
            filter(() => this._selectOnFocus && this._inEdition),
            delay(10),
            takeUntil(this.destroyed$)
        ).subscribe(() => {
            this.selectAll();
            this.focus();
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

    /** Définit une valeur indiquant si le contenu doit être sélectioné lors de l'édition */
    @Input()
    public set selectOnFocus(value: BooleanInput) {
        this._selectOnFocus = coerceBooleanProperty(value);
    }

    /** Retourne une valeur indiquant si le contenu doit être sélectioné lors de l'édition */
    public get selectOnFocus(): BooleanInput {
        return this._selectOnFocus;
    }

    /** Permet de désactiver le controle */
    @Input()
    public set disabled(value: BooleanInput) {
        const disabled = coerceBooleanProperty(value);
        this._disabled = disabled || null;
        if (this.disabled) {
            this.edit$.next(false);
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
        this.edit$.next(!this.disabled && coerceBooleanProperty(value));
    }

    /** Retourne une valeur indiquant si l'élément est en édition. */
    public get inEdition(): BooleanInput {
        return this._inEdition;
    }

    // ************* ControlValueAccessor Implementation **************
    // set accessor including call the onchange callback
    public set value(model: string | undefined) {
        if (model !== this.model) {
            this.writeValue(model);
            this.onChangeCallback(model);
        }
    }

    // get accessor
    public get value(): string | undefined {
        return this.model;
    }

    // From ControlValueAccessor interface
    public writeValue(value: string | undefined): void {
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
        const selection = window.getSelection();
        if (selection) {
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }

    /** Active la zone d'édition. */
    public edit(selectOnFocus?: boolean): void {
        this.selectOnFocus = selectOnFocus;
        this.edit$.next(!this.disabled);
    }

    public onTouchedCallback = (): void => undefined;
    public onChangeCallback = (_a?: unknown): void => undefined;

    private refreshView(): void {
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
