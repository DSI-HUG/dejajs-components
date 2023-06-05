/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Directive, ElementRef, NgZone, OnInit } from '@angular/core';
import { MatLegacyInput as MatInput } from '@angular/material/legacy-input';
import { Destroy } from '@deja-js/component/core';
import { debounceTime, fromEvent, mergeWith, of, startWith, takeUntil } from 'rxjs';

@Directive({
    selector: '[inputAutosize][matInput], [inputAutosize] [matInput]',
    exportAs: 'inputAutosize'
})
export class InputAutosizeDirective extends Destroy implements OnInit {

    public constructor(
        private elementRef: ElementRef<HTMLInputElement>,
        private ngZone: NgZone,
        private matInput: MatInput
    ) {
        super();
    }

    public ngOnInit(): void {
        const inputElement = this.elementRef.nativeElement;
        const valueChanges$ = this.matInput?.ngControl?.valueChanges || of(null as unknown);

        this.ngZone.runOutsideAngular(() => {
            fromEvent<Event>(inputElement, 'input').pipe(
                mergeWith(fromEvent<Event>(inputElement, 'paste'), valueChanges$),
                startWith(inputElement.value),
                debounceTime(5),
                takeUntil(this.destroyed$)
            ).subscribe(() => {
                const nbChar = inputElement.value?.length;

                // Forced to have a fallback value as the "style" is higher than class/usual style in the hierarchy
                inputElement.style.width = nbChar ? `${nbChar}ch` : '1ch';
                inputElement.style.maxWidth = '100%';
            });
        });
    }
}
