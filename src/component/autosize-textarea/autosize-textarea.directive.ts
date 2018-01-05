/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { AfterViewInit, Directive, ElementRef, forwardRef, OnDestroy } from '@angular/core';
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
 * Implémentation (créer un champ mat-input-container>textarea et lui ajouter la directive deja-autosize
 * Attention, comme la directive utilise un validateur pour détecter les modifications de contenu du textarea, le textarea doit impérativement utiliser ngModel.
 */
@Directive({
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => DejaAutosizeTextAreaDirective), multi: true },
    ],
    selector: 'textarea[deja-autosize]',
})
export class DejaAutosizeTextAreaDirective implements AfterViewInit, Validator, OnDestroy {
    private resize$ = new Subject<void>();
    private isAlive = true;

    constructor(private elementRef: ElementRef) {
        const textAreaElement = this.elementRef.nativeElement as HTMLTextAreaElement;

        Observable.from(this.resize$)
            .first()
            .subscribe(() => {
                textAreaElement.setAttribute('rows', '1');
                textAreaElement.style.overflowY = 'hidden';
            });

        Observable.from(this.resize$)
            .takeWhile(() => this.isAlive)
            .debounceTime(5)
            .do(() => textAreaElement.style.height = '18px')
            .subscribe(() => {
                textAreaElement.style.height = `${textAreaElement.scrollHeight}px`;
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
