/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { AfterViewInit, Directive, ElementRef, forwardRef, OnDestroy } from '@angular/core';
import { NG_VALIDATORS, Validator } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

/**
 * Directive pour rendre un textarea material redimensioné automatiquement au contenu.
 * Implémentation (créer un champ md-input-container>textarea et lui ajouter la directive deja-autosize
 * Attention, comme la directive utilise un validateur pour détecter les modifications de contenu du textarea, le textarea doit impérativement utiliser ngModel.
 * @deprecated use mat-autosize instead
 */
@Directive({
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => DejaAutosizeTextAreaDirective), multi: true },
    ],
    selector: 'textarea[deja-autosize]',
})
export class DejaAutosizeTextAreaDirective implements AfterViewInit, Validator, OnDestroy {
    private resize$ = new Subject<void>();
    private resize$sub: Subscription;

    constructor(private elementRef: ElementRef) {
        const textAreaElement = this.elementRef.nativeElement as HTMLTextAreaElement;

        Observable.from(this.resize$)
            .first()
            .subscribe(() => {
                textAreaElement.setAttribute('rows', '1');
                textAreaElement.style.overflowY = 'hidden';
            });

        this.resize$sub = Observable.from(this.resize$)
            .debounceTime(5)
            .do(() => textAreaElement.style.height = '18px')
            .subscribe(() => {
                textAreaElement.style.height = `${textAreaElement.scrollHeight}px`;
            });
    }

    public ngOnDestroy() {
        this.resize$sub.unsubscribe();
    }

    public ngAfterViewInit() {
        this.resize$.next();
    }

    public validate(): { [key: string]: any } {
        this.resize$.next();
        return null;
    }
}
