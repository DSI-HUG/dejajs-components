/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Directive, ElementRef, NgZone, OnInit } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { Destroy } from '@deja-js/component/core';
import { debounceTime, fromEvent, mergeWith, of, startWith, takeUntil } from 'rxjs';

@Directive({
    selector: '[matInput][inputAutosize]',
    exportAs: 'inputAutosize'
})
export class InputAutosizeDirective extends Destroy implements OnInit {
    private canvas: HTMLCanvasElement;

    public constructor(
        private elementRef: ElementRef<HTMLInputElement>,
        private ngZone: NgZone,
        private matInput: MatInput
    ) {
        super();
        this.canvas = document.createElement('canvas');
        console.log(this.matInput);
    }

    public ngOnInit(): void {
        const inputElement = this.elementRef.nativeElement;
        inputElement.style.visibility = 'hidden';

        const computedStyles = window.getComputedStyle(inputElement);
        const font = `${computedStyles.fontSize} ${computedStyles.fontFamily}`;
        const context = this.canvas.getContext('2d');
        context.font = font;

        const valueChanges$ = this.matInput?.ngControl?.valueChanges || of(null as unknown);

        this.ngZone.runOutsideAngular(() => {
            fromEvent<Event>(inputElement, 'input').pipe(
                mergeWith(fromEvent<Event>(inputElement, 'paste'), valueChanges$),
                debounceTime(50),
                startWith(inputElement.value),
                takeUntil(this.destroyed$)
            ).subscribe(() => {
                inputElement.style.visibility = 'visible';
                const metrics = context.measureText(inputElement.value);
                const width = Math.max(16, metrics.width + 5);
                inputElement.style.width = `${width}px`;
                inputElement.style.maxWidth = '100%';
            });
        });
    }
}
