/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { coerceNumberProperty } from '@angular/cdk/coercion';
import { AfterViewInit, Directive, ElementRef, forwardRef, Input, OnDestroy } from '@angular/core';
import { NG_VALIDATORS, Validator } from '@angular/forms';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/takeWhile';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

/**
 * Directive pour rendre un textarea material redimensioné automatiquement au contenu.
 * Implémentation (créer un champ mat-form-field-container>textarea et lui ajouter la directive deja-autosize
 * Attention, comme la directive utilise un validateur pour détecter les modifications de contenu du textarea, le textarea doit impérativement utiliser ngModel.
 */
@Directive({
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => DejaAutosizeTextAreaDirective), multi: true },
    ],
    selector: 'textarea[deja-autosize]',
})
export class DejaAutosizeTextAreaDirective implements AfterViewInit, Validator, OnDestroy {

    /** Définit le nombre de lignes lorsque aucun text ne figure dans le contrôle */
    @Input()
    public set rows(value: number | string) {
        this._rows = coerceNumberProperty(value);

        Observable.of(this._rows)
            .first()
            .do((rows) => {
                this.textAreaElement.setAttribute('rows', (rows || 1).toString());
                this.textAreaElement.style.overflowY = 'hidden';
            })
            .delay(1)
            .subscribe(() => {
                this.minHeight = this.textAreaElement.scrollHeight;
                this.textAreaElement.setAttribute('rows', '1');
            });
    }

    public get rows() {
        return this._rows;
    }

    private _rows = 1;
    private resize$ = new Subject<void>();
    private isAlive = true;
    private textAreaElement: HTMLTextAreaElement;
    private minHeight = 0;

    constructor(private elementRef: ElementRef) {
        this.textAreaElement = this.elementRef.nativeElement;

        Observable.from(this.resize$)
            .takeWhile(() => this.isAlive)
            .debounceTime(5)
            .do(() => this.textAreaElement.style.height = `${this.minHeight}px`)
            .subscribe(() => {
                this.textAreaElement.style.height = `${this.textAreaElement.scrollHeight}px`;
            });
    }

    public ngOnDestroy() {
        this.isAlive = false;
    }

    public ngAfterViewInit() {
        this.resize$.next();
    }

    public validate(): { [key: string]: any } {
        this.resize$.next();
        return null;
    }
}
